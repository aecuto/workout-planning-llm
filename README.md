# Workout planning with llama3 LLM model

this project is about workout planning with LLM. you can try it and star my repo :)

## Create .env.local and add MONGO_URL
```sh
MONGO_URL=mongodb://example:password!1@localhost:27017/workout?authsource=admin 

# MONGO_URL: you can use docker images or mongo atlas

```


## Setup ollama
To use free LLM, I recommend to use ollama is very easy just follow my step.
```sh
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# then install llama3 model

docker exec -it ollama ollama run llama3

```
ref: https://hub.docker.com/r/ollama/ollama 

## Start Server

First, run the development server:

```bash
npm ci

npm run dev
```

