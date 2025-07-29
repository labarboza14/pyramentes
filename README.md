# PyraMentes – Uma pirâmide coletiva de conhecimento

## O que é o PyraMentes?

O **PyraMentes** é uma ativação colaborativa e comunitária de mentorias criado pela comunidade Python Floripa. A ideia central é que **todo mundo tem algo a ensinar e algo a aprender**, por isso, cada participante é ao mesmo tempo mentor e mentorado.

No PyraMentes, você vai:

- Listar **3 temas que quer aprender**, contando qual seu objetivo com cada tema.
- Listar **3 temas que pode ensinar**, contando um pouco da sua experiência com cada um.
- Participar de sessões de mentoria com outras pessoas da comunidade, de forma simples, colaborativa e horizontal.
- Ganhar **PyCoins** — a moeda simbólica do PyraMentes — para incentivar o engajamento e as trocas de conhecimento. A comunidade "paga" as mentorias com as PyCoins.

---

## Por que participar?

- Aprenda com pessoas reais, que já enfrentaram os desafios da área.
- Compartilhe seus conhecimentos, mesmo que sejam básicos, técnicos ou até habilidades não técnicas (como fazer uma boa apresentação, organização, entre outros).
- Fortaleça sua rede de contatos e o senso de comunidade.
- Receba reconhecimento e recompensas no futuro (badges, rankings, certificados).

---

## Como funciona o sistema de PyCoins?

**PyCoins** são moedas simbólicas que incentivam a troca contínua de mentorias:

- Ao se cadastrar, você já recebe **3 PyCoins** para solicitar suas primeiras mentorias.
- Cada vez que você oferece uma sessão de mentoria como mentor, **ganha +1 PyCoin**.
- As PyCoins poderão ser usadas para solicitar sessões futuras e participar de eventos e desafios gamificados.
- Isso ajuda a manter o ciclo saudável de trocas e evita que alguém só receba ou só ofereça.

---

## O projeto de código: o que faz, como faz e tecnologias usadas

### O que o projeto faz?

Este projeto é uma aplicação web simples que conecta pessoas que querem aprender e ensinar temas diversos na área de tecnologia e habilidades relacionadas. Ele permite que você:

- Cadastre seus dados pessoais, três temas para aprender (com seus objetivos) e três temas para ensinar (com sua experiência).
- Gerencie os temas diretamente no formulário, com interface amigável para adicionar e remover.
- Receba um "match" automático de acordo com os temas cadastrados, conectando pessoas com interesses compatíveis.
- Tenha controle do saldo de PyCoins para incentivar a participação.
- Tenha um backend robusto para receber, validar, armazenar e processar os dados.

### Como ele funciona?

- **Frontend:** Formulário em HTML, CSS e JavaScript que captura as informações do usuário, valida localmente, gerencia listas de temas para ensinar e aprender, e envia os dados para o backend via API.
- **Backend:** Aplicação em Python usando o framework FastAPI que recebe os cadastros, armazena temporariamente na memória (em uma lista) e executa a lógica de "match" entre os temas de diferentes pessoas.
- **Comunicação:** O frontend se comunica com o backend através de requisições HTTP usando o método POST para enviar dados de cadastro e receber informações de retorno.
- **Sistema de moedas (PyCoins):** O backend atribui 3 PyCoins na criação do cadastro e incrementa PyCoins conforme sessões de mentoria são confirmadas, mantendo o controle do saldo para cada usuário.

### Tecnologias usadas

| Tecnologia      | O que faz                                  | Por que usamos                                    |
|-----------------|-------------------------------------------|--------------------------------------------------|
| **Python 3.9+** | Linguagem principal do backend            | Facilidade, rapidez no desenvolvimento e suporte amplo. |
| **FastAPI**     | Framework para API REST                    | Performance, facilidade para criar APIs e documentação automática. |
| **Pydantic**    | Validação e tipagem de dados no backend   | Garantia de dados corretos e estruturados.       |
| **JavaScript**  | Controle do frontend, interação com o usuário | Manipulação dinâmica do formulário e comunicação com backend. |
| **HTML/CSS**    | Estrutura e estilo do formulário           | Interface simples, responsiva e agradável.       |
| **Fetch API**   | Comunicação assíncrona entre frontend e backend | Envio e recebimento de dados sem recarregar a página. |

### Arquitetura e fluxo de dados

1. O usuário abre o formulário no navegador.
2. Adiciona os temas que deseja aprender e ensinar.
3. Clica em enviar; o JavaScript valida os dados, monta o objeto com as informações, e faz uma requisição POST para o backend.
4. O backend valida o cadastro, armazena na lista interna e devolve uma resposta com o saldo inicial de PyCoins e possíveis matches.
5. O frontend mostra a mensagem de sucesso, saldo de PyCoins e lista de matches (se houver).
6. O usuário combina a mentoria diretamente com os matches encontrados para sessões online/offline.
7. A cada sessão realizada, o mentor ganha mais PyCoins (isso pode ser implementado numa futura atualização).

---

## Passo a passo para usar o PyraMentes

### 1. Cadastro

Você deve preencher um formulário simples com:

- Seu nome completo.
- Seu e-mail.
- Três temas que deseja aprender, com uma breve descrição do seu objetivo em cada um.
- Três temas que pode ensinar, com uma breve descrição da sua experiência em cada um.

**Importante:** Como todos são mentores e mentorados, não existe mais a escolha entre ser “mentor” ou “mentorado”. Todos fazem as duas coisas!

---

### 2. Envio do cadastro

- Ao enviar, seu cadastro é salvo e você já recebe 3 PyCoins.
- A aplicação tenta encontrar pessoas com temas compatíveis para criar um “match” — que significa uma conexão entre mentor e mentorado.
- Por enquanto, o agendamento das mentorias é feito diretamente entre as pessoas, combinando o melhor horário.

---

### 3. Realização das mentorias

- As sessões têm duração sugerida de 60 minutos.
- Elas podem acontecer online (via Google Meet, Zoom, etc.) ou presencialmente, dependendo do combinado entre as pessoas.
- Cada sessão realizada como mentor gera mais 1 PyCoin para você, incentivando a continuidade.

---

### 4. Futuro do projeto

O PyraMentes pretende evoluir com:

- Plataforma gamificada, com badges, ranking e sistema de reputação.
- Mais ferramentas para facilitar os encontros e medir o impacto.
- Integração com a comunidade Tech Floripa e eventos presenciais.

---

## Como rodar o projeto localmente (para quem quer ajudar no desenvolvimento)

### Requisitos

- Python 3.9 ou superior
- Node.js (opcional, se quiser rodar frontend separado)
- Git instalado

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/pyra-mentes.git
   cd pyra-mentes
````

2. Crie e ative o ambiente virtual Python:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

4. Rode o backend FastAPI:

   ```bash
   uvicorn main:app --reload
   ```

5. Abra o arquivo `index.html` no navegador para testar o formulário frontend localmente.

---

## Estrutura dos arquivos

* **main.py** — código backend em FastAPI para receber cadastros e fazer o match entre temas.
* **index.html** — formulário para cadastro, com campos para ensinar/aprender e informações.
* **styles.css** — estilos visuais para o formulário.
* **scripts.js** — código JavaScript que controla o formulário, adiciona temas e envia dados para o backend.

---

## Dicas para preencher o formulário

* Nos temas para **aprender**, explique o que você quer alcançar com aquele tema. Exemplo: “Aprender fundamentos básicos de Git para controlar meus projetos.”
* Nos temas para **ensinar**, conte sua experiência, mesmo que seja pequena ou não técnica. Exemplo: “Posso ajudar com organização pessoal e técnicas para estudar melhor.”
* Seja claro e honesto: o objetivo é facilitar conexões reais.

---

## Contato e contribuição

Se quiser ajudar a melhorar o PyraMentes, contribua no GitHub, envie sugestões, reporte bugs ou participe dos encontros da comunidade Python Floripa.

---

**Vamos juntos construir uma comunidade mais colaborativa e forte!**

---

*Projeto inspirado no espírito colaborativo da Python Floripa e idealizado para crescer com a comunidade.*

---

# Licença

Este projeto é aberto e gratuito para uso comunitário.

---

### Última atualização: julho de 2025

---

```

