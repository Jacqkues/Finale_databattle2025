from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from openai import OpenAI
from qdrant_client import QdrantClient
from services.genai import text_to_text, text_image_to_text  , generate_question , rewrite_question , analyse_answer_groq,analyse_answer_judge
from services.retrivial import Retrivial
import gc
from colpali_engine.models import ColQwen2_5, ColQwen2_5_Processor
import os
from utils import encode_img, load_json
from fastapi.templating import Jinja2Templates
from qdrant_client.models import Filter, FieldCondition, MatchAny
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text,select, func
from fastapi.staticfiles import StaticFiles
import random
import markdown
from fastembed import LateInteractionTextEmbedding
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List, Optional,Dict , Any


NUM_PAGE_TO_FETCH = 1


category = ["Filing Requirements & Formalities", "Priority Claims & Right of Priority", "Divisional Applications", "Fees, Payment & Time Limits", "Languages & Translations","Procedural Remedies & Legal Effect","PCT Procedure & Entry into EP Phase","Examination, Amendments, and Grant","Opposition & Appeals","Substantive Patent Law","Entitlement & Transfers"]
base_image_path = "/app/data/pdf-images"
base_url = "/app/data/pdf-images"
question_file = "/app/data/question-categories/categoriev2.json"


Base = declarative_base()
class Evaluator(Base):
    __tablename__ = "evaluators"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    closed_questions = Column(Boolean, default=False)
    scoring = Column(String)
    criteria = Column(String)
    difficulty = Column(String)


class PageLink(Base):
    __tablename__ = "pagelink"
    id = Column(Integer, primary_key=True, index=True)
    pdf_path = Column(Text)
    evaluator_id = Column(Integer)

class Question(Base):
    __tablename__ = "question"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    category = Column(Text)

class QuestionLink(Base):
    __tablename__ = "questionlink"
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer)
    evaluator_id = Column(Integer)

class QuestionPageLink(Base):
    __tablename__ = "question_page_link"
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer)
    page = Column(Text)

class Score(Base):
    __tablename__ = "score"
    id = Column(Integer, primary_key=True, index=True)
    evaluator_id = Column(Integer)
    good = Column(Integer)
    total = Column(Integer)




class EvaluatorSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    closed_questions: bool
    scoring: Optional[str] = None
    criteria: Optional[str] = None

    class Config:
        orm_mode = True

class EvaluatorCreate(BaseModel):
    name: str
    category: str
    subcategories: List[str]  # adjust type if needed
    isOpenQuestion: bool
    difficulty: str           # or int, depending on your use case
    evaluationCriteria: Optional[str] = None
    scoring: Optional[str] = None


SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)



templates = Jinja2Templates(directory="templates")





@asynccontextmanager
async def lifespan(app: FastAPI):
    
    print("load open router client")
    app.open_router_api = OpenAI(base_url="https://openrouter.ai/api/v1",api_key="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")
    print("load groq client")
    app.groq_api = OpenAI(base_url="https://api.groq.com/openai/v1", api_key=os.getenv("GROQ_API"))
    print("load ollama client")
    app.ollama = OpenAI(base_url= 'http://localhost:11434/v1',api_key= 'ollama')
    print("connecting to qdrant")
    app.qdrant_client = QdrantClient(
        url=os.getenv("DATABASE_URL"),
        api_key=os.getenv("DATABASE_KEY"),
    )

    print("Init retrivial model ...")

    colqwen_model = ColQwen2_5.from_pretrained(
        "vidore/colqwen2.5-v0.2",
    ).eval()
    processor = ColQwen2_5_Processor.from_pretrained("vidore/colqwen2.5-v0.1")

   

    print("Retrivial model ok !")

    print("Question retrivial init...")
    #colbert = LateInteractionTextEmbedding("colbert-ir/colbertv2.0")

    app.retrivial = Retrivial(None,processor,colqwen_model,app.qdrant_client)

    print("Init sql base ")
    app.db = SessionLocal()

    print("Check if question is empty")
    if not app.db.query(Question).first():
        print("init question...")
        data = load_json(question_file)
        for item in data["content"]:
            for cate in item["subcategories"]:
                theme = cate["name"]
                print(f"------{theme}-------------")
                for question in cate["questions"]:
                        q = Question(question=question,category=theme)
                        app.db.add(q)
                        app.db.commit()
                        app.db.refresh(q)
                        print("retrieve pages ...")
                        pages = app.retrivial.fetch_doc_page(question,None,NUM_PAGE_TO_FETCH)[0]
                        print(f"fetch {len(pages.points)} pages ")
                        for page in pages.points:
                            link = QuestionPageLink(question_id = q.id, page=os.path.join(base_image_path, page.payload["pdf"], page.payload["page"]))
                            app.db.add(link)
                            app.db.commit()


    yield

    colqwen_model = None
    processor = None
    colbert = None

    app.db.close()
    app = None
    gc.collect()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows specified origins. Use ["*"] to allow all origins.
    allow_credentials=True,
    allow_methods=["*"],    # Allows all HTTP methods.
    allow_headers=["*"],    # Allows all headers.
)

app.mount("/data", StaticFiles(directory="data"), name="data")


@app.get("/evaluator", response_model=List[EvaluatorSchema])
async def get_evaluators():
    evaluators = app.db.query(Evaluator).order_by(Evaluator.id.desc()).all()
    return evaluators

@app.get("/", response_class=HTMLResponse)
async def chatbot(request: Request):

    return templates.TemplateResponse("chatbot.html", {"request": request})




@app.get("/create_evaluator", response_class=HTMLResponse)
async def new_evaluator(request: Request):


    return templates.TemplateResponse("create_evaluator.html", {"request": request, "message": "Create Evaluator","categorys":category})



@app.post("/create_evaluator_v2")
async def create_evaluator_v2(evaluator: EvaluatorCreate):
    # Process the data (e.g., store it in the database)
    # For now, just return the received data as confirmation
    print(evaluator)

    created_evaluator = Evaluator(
        name=evaluator.name,
        description=evaluator.category,
        closed_questions=not(evaluator.isOpenQuestion),
        scoring=evaluator.scoring,
        criteria=evaluator.evaluationCriteria,
        difficulty= evaluator.difficulty
    )

    app.db.add(created_evaluator)
    app.db.commit()
    app.db.refresh(created_evaluator)

    new_score = Score(evaluator_id=created_evaluator.id, good=0, total=0)
    app.db.add(new_score)
    app.db.commit()

    for categorie in evaluator.subcategories:
        print(f"--------fetching for {categorie} -----------")
        questions = app.db.query(Question).filter(Question.category == categorie).order_by(func.random()).limit(2).all()

        print(f"----------------Fetched {questions}---------------------------------")

        for question in questions:
            app.db.add(QuestionLink(question_id=question.id,evaluator_id = created_evaluator.id))
            app.db.commit()
            app.db.refresh(question)
            print("fetching related page...")

            #pages = app.retrivial.fetch_doc_page(question.question,None,NUM_PAGE_TO_FETCH)[0]
            #pages = app.db.query(QuestionPageLink).filter(QuestionLink.question_id == question.id).all()
            pages = (
                app.db.query(QuestionPageLink)
                .join(QuestionLink, QuestionPageLink.question_id == QuestionLink.question_id)
                .filter(QuestionLink.question_id == question.id)
                .all()
            )
            for page in pages:
                #change by 
                link = PageLink(
                    pdf_path=page.page,
                    evaluator_id=created_evaluator.id
                )

                app.db.add(link)
                app.db.commit()
                app.db.refresh(link)

                print(f"{link.evaluator_id} - {link.pdf_path}")

    return {"message": "Evaluator created", "evaluator": evaluator}




@app.get("/edit_evaluator/{evaluator_id}", response_model=Dict[str, Any])
async def edit_evaluator(evaluator_id: int):
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()
    if not evaluator:
        raise HTTPException(status_code=404, detail="Evaluator not found")
    
    stmt = select(PageLink).where(PageLink.evaluator_id == evaluator_id)
    items = app.db.scalars(stmt).all()

    sources = []
    for item in items:
        source = item.pdf_path.split('/')
        page = source[-1]
        file = source[-2]
        formatted_string = file + " " + page.replace('.png', "").replace('_', ' ')
        url = os.path.join(base_url, file, page)
        sources.append({"formatted_string": formatted_string, "url": url})
    
    return {"evaluator": evaluator, "sources": sources}

@app.get("/evaluator/{evaluator_id}")
async def get_evaluator_info(evaluator_id: int):
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()
    if not evaluator:
        raise HTTPException(status_code=404, detail="Evaluator not found")
    
    stmt = select(PageLink).where(PageLink.evaluator_id == evaluator_id)
    items = app.db.scalars(stmt).all()

    sources = []
    for index, item in enumerate(items):
        source = item.pdf_path.split('/')
        page = source[-1]
        file = source[-2]
        formatted_string = file + " " + page.replace('.png', "").replace('_', ' ')
        url = os.path.join(base_url, file, page)
        sources.append({"id": index + 1, "reference": formatted_string, "url": url})
    
    score = app.db.query(Score).filter(Score.evaluator_id == evaluator_id).one()

    if score.total == 0:
        total_score = 0
    else:
        total_score = round((score.good * 100)/score.total)

    out = {
        "name":evaluator.name,
        "category":evaluator.description,
        "difficulty":evaluator.difficulty,
        "sources":sources,
        "score":total_score
    }

    return out


@app.post("/delete_evaluator/{evaluator_id}")
async def delete_evaluator(evaluator_id: int):
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()
    if evaluator:
        app.db.delete(evaluator)
        app.db.query(PageLink).filter(PageLink.evaluator_id == evaluator_id).delete()
        app.db.query(Score).filter(Score.evaluator_id == evaluator_id).delete()

        app.db.commit()
    return RedirectResponse(url="/evaluator", status_code=303)

@app.get("/evaluator/{evaluator_id}", response_class=HTMLResponse)
async def read_evaluator(request: Request, evaluator_id: int):
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()
    return templates.TemplateResponse("chat.html", {"request": request, "evaluator": evaluator})

@app.get("/examen_question/{evaluator_id}")
async def get_quest(request:Request,evaluator_id:int):
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()


    question_ids = app.db.scalars(
        select(QuestionLink.question_id).where(QuestionLink.evaluator_id == evaluator_id)
    ).all()

    # Return None if no questions are linked
    if not question_ids:
        return None

    random_question_id = random.choice(question_ids)

    question = app.db.scalar(select(Question).where(Question.id == random_question_id))

    #todo check which is better


    data = app.retrivial.fetch_question(question.question)

    #data = app.retrivial.fetch_question(evaluator.description)
    data = random.choice(data.points).payload
    return templates.TemplateResponse("question.html", {"evaluator": evaluator_id, "request": request, "question":data.get("question") , "image_url":"test/test/test","answer":data.get('answer'),"legal_basis":"notdefineds"})



from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.future import select
import random

@app.get('/generate/{evaluator_id}', response_class=JSONResponse)
async def generate(request: Request, evaluator_id: int):
    stmt = select(PageLink).where(PageLink.evaluator_id == evaluator_id)
    items = app.db.scalars(stmt).all()
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()

    print(items)

    select_item = random.choice(items)
    base64_img = encode_img(select_item.pdf_path)

    data = generate_question(app.open_router_api, base64_img, evaluator.description, evaluator.difficulty, evaluator.closed_questions)
    print(data.get('question'))
    response_data = {
        "evaluator": evaluator_id,
        "question": data.get("question"),
        "image_url": select_item.pdf_path,
        "answer": data.get("answer"),
        "legal_basis": data.get("legal_basis")
    }

    return JSONResponse(response_data)


@app.get("/search_pages")
async def search_pages(query:str):
    return {"pages": app.retrivial.fetch_doc_page(query,None)}

@app.post("/ask", response_class=JSONResponse)
async def ask_question(query: str = Form(...),source_only = Form(...)):
    print("Let's answer the user query!")
    
    print(source_only)

    only_search_source = False
    # Set this flag as needed
    if source_only == "true":
        only_search_source = True

    data_sources = []

    print(f"received query {query}")
    # Fetch pages using your retrieval method
    all_pages = app.retrivial.fetch_doc_page(query, None)[0].points
    first_page = all_pages[0].payload

    # Build a list of source information
    for p in all_pages:
        i_path = os.path.join(base_image_path, p.payload["pdf"], p.payload["page"])
        parts = i_path.split('/')
        page = parts[-1]
        file = parts[-2]
        formatted_string = f"{file} {page.replace('.png', '').replace('_', ' ')}"
        url = os.path.join(base_url, file, page)
        data_sources.append({
            "formatted_string": formatted_string,
            "url": url
        })

    image_path = os.path.join(base_image_path, first_page["pdf"], first_page["page"])
    base64_img = encode_img(image_path)

    # Generate answer text based on the query and image
    output = text_image_to_text(app.open_router_api, query, base64_img, "google/gemma-3-4b-it:free")
    
    # Also prepare a primary source information for the answer (if needed)
    parts = image_path.split('/')
    page = parts[-1]
    file = parts[-2]
    formatted_string = f"{file} {page.replace('.png', '').replace('_', ' ')}"
    url = os.path.join(base_url, file, page)
    source_data = {
        "formatted_string": formatted_string,
        "url": url
    }

    # Return JSON without HTML markup. Depending on your flag, return only sources or both answer and source.
    if only_search_source:
        return {"reply": None, "sources": data_sources}
    else:
        return {"reply": output, "sources": [source_data]}





@app.post("/analyse_answer/{evaluator_id}", response_class=JSONResponse)
async def analyse_answer_route(
    request: Request,
    evaluator_id: int,
    question: str = Form(...),
    real_answer: str = Form(...),
    legal_doc: str = Form(...),
    user_answer: str = Form(...),
    image_url: str = Form(...),
):
    
    print("analyse use answer")
    evaluator = app.db.query(Evaluator).filter(Evaluator.id == evaluator_id).first()

    score = app.db.query(Score).filter(Score.evaluator_id == evaluator_id).one()
    score.total += 1
    #result = analyse_answer_judge(app.ollama,question,user_answer,real_answer + " justification : " + legal_doc,evaluator.criteria,evaluator.scoring)
    result = analyse_answer_groq(
        app.groq_api,
        question,
        user_answer,
        real_answer + " justification : " + legal_doc,
        evaluator.criteria,
        evaluator.scoring
    )
    print(result)

    # Process the image_url to build a formatted image name and full URL.
    source = image_url.split('/')
    page = source[-1]
    file = source[-2]
    formatted_string = file + " " + page.replace('.png', "").replace('_', ' ')

    url = os.path.join(base_url, file, page)  # Ensure base_url is defined in your context

    if evaluator.closed_questions:
        score.good += int(result.get('score'))
    else:
        if int(result.get('score')) > 5:
            score.good += 1

    app.db.commit()
    app.db.refresh(score)

    response_data = {
        "evaluator": evaluator_id,
        "question": question,
        "feedback": result.get("feedback"),
        "score": result.get("score"),
        "user_answer": user_answer,
        "image_name": formatted_string,
        "image_url": url,
    }
    return JSONResponse(response_data)