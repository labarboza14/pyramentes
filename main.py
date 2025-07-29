from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permitir front-end rodando em localhost ou qualquer origem acessar a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # para produção, restrinja para domínios específicos
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic para validação dos dados

class Tema(BaseModel):
    tema: str = Field(..., example="Python")
    nivel: str = Field(..., example="iniciante")  # iniciante, intermediario, avancado

class Disponibilidade(BaseModel):
    dias: List[str] = Field(default_factory=list, example=["Segunda", "Quarta"])
    horarios: List[str] = Field(default_factory=list, example=["Manhã", "Noite"])
    frequencia: str = Field(..., example="1horaSemana")

class Cadastro(BaseModel):
    nome: str = Field(..., example="Maria Silva")
    email: EmailStr
    temas_oferecidos: List[Tema]
    temas_desejados: List[Tema]
    nivel: str = Field(..., example="iniciante")
    disponibilidade: Disponibilidade

# "Banco de dados" em memória para teste
db_cadastros: List[Cadastro] = []

@app.post("/cadastrar")
def cadastrar_usuario(cadastro: Cadastro):
    # Checar se o email já existe (independente dos temas)
    for c in db_cadastros:
        if c.email.lower() == cadastro.email.lower():
            raise HTTPException(status_code=400, detail="Usuário já cadastrado com este email.")

    db_cadastros.append(cadastro)
    return {"message": "Cadastro realizado com sucesso"}

@app.post("/match")
def buscar_match(
    temas_oferecidos: List[str],
    temas_desejados: List[str],
    nivel: str,
):
    matches = []

    # Para simplificar, consideramos match se:
    #  - algum tema que você oferece está na lista de temas desejados do outro
    #  - e algum tema que você deseja está na lista de temas oferecidos do outro
    #  - e o nível da pessoa é igual ou superior (aqui só igual para simplicidade)

    for c in db_cadastros:
        temas_c_oferecidos = [t.tema.lower() for t in c.temas_oferecidos]
        temas_c_desejados = [t.tema.lower() for t in c.temas_desejados]

        # Verificar interseção bidirecional de temas
        oferece_para_solicitante = any(t.lower() in temas_desejados for t in temas_c_oferecidos)
        deseja_do_solicitante = any(t.lower() in temas_oferecidos for t in temas_c_desejados)

        if oferece_para_solicitante and deseja_do_solicitante and c.nivel == nivel:
            matches.append(c)

    return matches
