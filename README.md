![Title](./screen.PNG)

# Vignemale 

Ce projet a été réalisé pour la finale du Data Battle 2025 organisé par IA Pau.

Il s'agit d'une plateforme utilisant des agents IA afin d'évaluer des étudiants en droit des brevets.

# Utilisation

Pour la démo, nous utilisons des services IA externes (Groq et OpenRouter). Cela est principalement dû au fait que nous n'avons que 10 minutes de présentation et que nos ordinateurs sont peu puissants.  

La solution peut facilement être adaptée pour fonctionner uniquement avec Ollama, à condition de disposer d'un GPU avec environ 14 Go de VRAM (comme une Nvidia T4 disponible sur Google Colab).  

### Instructions pour lancer la démo :  
1. Renseignez les champs manquants dans le fichier docker-compose.yml, à savoir :  
   - Clés API Groq  
   - Clés API OpenRouter  
   - Clé API Qdrant + URL de la base de données  

2. Ensuite, créez l'image Docker :


```
docker compose build
```

puis vous pouvez la lancer 

```
docker compose run
```

### Utilisation avec ollama 

Pour utiliser l'application avec ollama plutot qu'avec des services externes il faut : 

Télécharger les modèles : 

`ollama pull hf.co/flowaicom/Flow-Judge-v0.1-GGUF`

et 

`ollama pull gemma3`

ensuite : 

commenter la ligne commencant par : `result=analyse_answer_groq(` dans backend/main.py et dans la fonction analyse_answer_route et decommenter la ligne commencant par `result=analyse_answer_groq(` dans la meme fonction : 

```
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
    result = analyse_answer_judge(app.ollama,question,user_answer,real_answer + " justification : " + legal_doc,evaluator.criteria,evaluator.scoring)
    #result = analyse_answer_groq(
        app.groq_api,
        question,
        user_answer,
        real_answer + " justification : " + legal_doc,
        evaluator.criteria,
        evaluator.scoring
    )
```

# Information

Les scripts pour créer la base de données sont dans le répertoire data.











