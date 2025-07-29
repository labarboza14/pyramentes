const temas = [];

const temaInput = document.getElementById('temaInput');
const nivelTema = document.getElementById('nivelTema');
const addTemaBtn = document.getElementById('addTemaBtn');
const listaTemas = document.getElementById('listaTemas');
const form = document.getElementById('formCadastro');
const feedback = document.getElementById('feedback');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderTemas() {
  listaTemas.innerHTML = '';
  temas.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.tema} - ${capitalize(item.nivel)}`;

    const btnRemove = document.createElement('button');
    btnRemove.type = 'button';
    btnRemove.textContent = 'Remover';
    btnRemove.onclick = () => {
      temas.splice(index, 1);
      renderTemas();
    };

    li.appendChild(btnRemove);
    listaTemas.appendChild(li);
  });
}

addTemaBtn.addEventListener('click', () => {
  const temaVal = temaInput.value.trim();
  const nivelVal = nivelTema.value;

  if (!temaVal) {
    alert('Por favor, digite um tema.');
    return;
  }
  if (!nivelVal) {
    alert('Por favor, selecione o nível para o tema.');
    return;
  }
  if (temas.length >= 5) {
    alert('Você pode adicionar no máximo 5 temas.');
    return;
  }
  if (temas.some(t => t.tema.toLowerCase() === temaVal.toLowerCase())) {
    alert('Este tema já foi adicionado.');
    return;
  }

  temas.push({ tema: temaVal, nivel: nivelVal });
  renderTemas();

  temaInput.value = '';
  nivelTema.value = '';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (temas.length === 0) {
    alert('Por favor, adicione pelo menos um tema com nível.');
    return;
  }

  const dados = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    tipo: form.tipo.value,
    temas: temas,
    disponibilidade: {
      dias: Array.from(form.querySelectorAll('input[name="dias"]:checked')).map(i => i.value),
      horarios: Array.from(form.querySelectorAll('input[name="horarios"]:checked')).map(i => i.value),
      frequencia: form.frequencia.value,
    }
  };

  feedback.textContent = 'Enviando dados...';
  feedback.className = 'feedback feedback-info';

  try {
    // Ajuste a URL para o seu backend
    const urlBase = 'http://127.0.0.1:8000';

    // Cadastro
    const resCadastro = await fetch(urlBase + '/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!resCadastro.ok) {
      const erro = await resCadastro.json();
      throw new Error(erro.detail || 'Erro desconhecido');
    }

    // Match automático
    const resMatch = await fetch(urlBase + '/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temas: dados.temas.map(t => t.tema), nivel: dados.temas[0].nivel, tipo: dados.tipo }),
    });

    const matches = await resMatch.json();

    let msg = '';

    if (matches.length > 0) {
      msg = `🎉 Encontramos um match para você! Em breve você receberá um contato com as informações.`;
    } else {
      msg = `✅ Cadastro realizado com sucesso! Vamos localizar um ${dados.tipo === 'mentor' ? 'mentorado' : 'mentor'} compatível e entraremos em contato em breve.`;
    }

    feedback.textContent = msg;
    feedback.className = 'feedback feedback-success';
    form.reset();
    temas.length = 0;
    renderTemas();

  } catch (error) {
    feedback.textContent = '❌ Ocorreu um erro ao enviar os dados. Tente novamente mais tarde.';
    feedback.className = 'feedback feedback-error';
    console.error(error);
  }
});
