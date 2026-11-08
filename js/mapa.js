(function () {
var ROOT = document.getElementById('mapaRoot');

const STAGES = [
  { name: "Diagnóstico", weeks: "Semana 1", var: "--c0",
    goal: "Descobrir o que o mercado pede e deixar a base pronta para estudar e se candidatar.",
    tasks: [
      ["Ler 30 vagas de estágio e júnior remotas", "Levantamento inicial pronto: 33 anúncios na planilha. Leia pelo menos 15 deles por conta própria e confira se o padrão se confirma."],
      ["Contar as 5 tecnologias mais pedidas e confirmar a stack", "Na amostra de 26 vagas com requisitos: Git, SQL e APIs em 7 cada; ecossistema JavaScript em 9; Java e Python em 5 cada. Decisão sugerida: JavaScript e React como trilha principal."],
      ["Organizar o GitHub", "Foto, bio curta e um README de perfil."],
      ["Atualizar o LinkedIn", "Título, resumo, foto e a opção “aberta a oportunidades”."],
      ["Criar a planilha de candidaturas", "Colunas: empresa, vaga, data, link, status e retorno."],
      ["Conversar com a coordenação sobre estágio obrigatório remoto"],
      ["Reservar na agenda os horários fixos de estudo"],
      ["Fazer a segunda rodada de busca: QA, suporte e implantação", "Rodada feita: 29 anúncios (13 de QA, 8 de suporte e 8 de implantação), na aba Rodada 2 da planilha. Falta você ler alguns deles."],
      ["Escolher 3 vagas de estágio remoto da planilha como alvo inicial", "Os três anúncios escolhidos (KIS, Nexti e ASC) saíram do ar. Use os requisitos deles como modelo e escolha vagas abertas hoje. Veja a seção Perfis de vaga-alvo."]
    ],
    milestone: "Stack escolhida, perfis criados e planilha pronta" },
  { name: "Fundamentos", weeks: "Semanas 2 a 6", var: "--c1",
    goal: "Dominar o básico de JavaScript e de Git e publicar o primeiro projeto.",
    tasks: [
      ["JavaScript: variáveis, tipos, condicionais e laços", "Caderno de anotações, com datas de início e fim, na aba <a href='#caderno-1-0'>Estudos</a>."],
      ["JavaScript: funções, arrays e objetos", "Pratique map, filter e reduce."],
      ["JavaScript: DOM e eventos"],
      ["JavaScript: async/await, fetch e JSON"],
      ["Git no dia a dia: commit, branch, merge e push", "Faça pelo menos um commit por dia de estudo. Git, SQL e APIs foram os requisitos mais citados nas vagas."],
      ["Revisar HTML e CSS com Flexbox, Grid e layout responsivo"],
      ["Criar o Projeto 1: app que consome uma API pública", "Lista de tarefas com dados externos, clima, filmes ou algo ligado ao seu interesse."],
      ["Publicar o Projeto 1 no ar (Vercel ou GitHub Pages)"],
      ["Escrever o README do Projeto 1 em inglês, com prints"],
      ["Ler documentação técnica em inglês (MDN) por 20 minutos por dia"],
      ["Praticar SQL com JOIN, INSERT e UPDATE em um banco real", "Aparece em 7 das 26 vagas com requisitos. Você já tem base: aproveite."],
      ["Entender APIs REST: GET, POST, PUT, DELETE e códigos de status", "Também em 7 das 26 vagas. Teste as chamadas no Projeto 1."],
      ["Aprender o básico de teste de software: casos de teste, relato de bug e Jira", "Pedido pela Nexti (vaga-alvo de QA). Uma semana de estudo já dá a base."],
      ["Testar uma API pública no Postman", "Também citado pela Nexti. Serve de treino para a etapa de APIs."]
    ],
    milestone: "Projeto 1 publicado, com README" },
  { name: "Primeiras candidaturas", weeks: "A partir da semana 4", var: "--c2",
    goal: "Começar a se candidatar cedo. Entrevista ruim também ensina, e a rede de contatos leva tempo para render.",
    tasks: [
      ["Montar o currículo de 1 página", "Projetos no topo e experiência em processos, mapeamento e UX em destaque."],
      ["Criar a versão do currículo em inglês", "Vagas como Westpoint e KIS pedem inglês explicitamente."],
      ["Escrever uma mensagem modelo para recrutadores", "Escreva uma versão curta, com quem você é, o que estuda e o que procura."],
      ["Enviar as primeiras 10 candidaturas", "Estágio, QA, suporte técnico e analista de sistemas, além de dev."],
      ["Enviar 30 candidaturas no total", "Meta: 5 a 10 por dia útil, personalizando a mensagem."],
      ["Mandar mensagem a 10 egressos e professores da UTFPR"],
      ["Pedir 2 recomendações no LinkedIn"],
      ["Entrar em 3 comunidades de desenvolvedores (Discord ou LinkedIn)"],
      ["Candidatar-se às vagas-alvo da planilha de levantamento", "Priorize estágio e trainee remotos: foram 16 dos 33 anúncios."],
      ["Incluir vagas de implantação e de UX/UI na busca", "Combinam com sua experiência em processos e UX. O levantamento achou estágios nas duas áreas."],
      ["Achar 3 vagas abertas hoje e confirmar que o botão de candidatura funciona", "Use os filtros de estágio e remoto da Gupy, do LinkedIn (últimos 7 dias) e da ProgramaThor. Anúncios que aparecem em buscas antigas costumam estar encerrados."],
      ["Enviar candidatura às 3 vagas abertas, com um currículo ajustado para cada uma", "QA: SQL e experiência com processos. Desenvolvimento: lógica e projetos pessoais. Web: HTML, CSS e JavaScript."],
      ["Entrar no banco de talentos da Visagio (v(dev))", "Estágio remoto de desenvolvimento, aberto e confirmado em 01/11/2026. <a href='https://vdev.gupy.io/jobs/11357264?jobBoardSource=gupy_public_page' target='_blank' rel='noopener'>Abrir a página da vaga</a>"]
    ],
    milestone: "30 candidaturas enviadas e rede de contatos aberta" },
  { name: "Projeto principal", weeks: "Semanas 7 a 14", var: "--c3",
    goal: "Construir uma aplicação completa que mostre sua combinação de código com processos e UX.",
    tasks: [
      ["React: componentes, props e estado"],
      ["React: hooks e rotas"],
      ["Node e Express: criar uma API REST"],
      ["Conectar a API a um banco PostgreSQL"],
      ["Login com JWT"],
      ["CRUD completo no Projeto 2", "Ideias: gestão de fluxos de trabalho, agendamento, painel de processos."],
      ["Desenhar o protótipo no Figma antes de programar", "É o seu diferencial frente a quem só programa."],
      ["Testes automáticos básicos com Jest"],
      ["Publicar o Projeto 2 (Vercel e Render)"],
      ["README em inglês, com prints e instruções para rodar"],
      ["Noções de Python: funções, listas e dicionários", "A KIS pede Python e React no mesmo estágio. Basta o nível de iniciante."]
    ],
    milestone: "Projeto 2 no ar, com testes básicos e README" },
  { name: "Preparação para entrevistas", weeks: "Semanas 12 a 18", var: "--c4",
    goal: "Chegar à entrevista segura: lógica, trabalho em equipe e conversa em inglês.",
    tasks: [
      ["Estruturas de dados: arrays, pilhas, filas e hash maps"],
      ["Resolver 2 a 3 exercícios fáceis por semana (LeetCode ou HackerRank)"],
      ["Git em equipe: branches e pull requests"],
      ["Fazer uma contribuição simples em open source", "Corrigir documentação já conta."],
      ["Noções de Docker"],
      ["Escrever 10 respostas para perguntas comportamentais (método STAR)"],
      ["Preparar o pitch de 1 minuto em português e em inglês"],
      ["Fazer 3 simulações de entrevista com colega ou IA"],
      ["Praticar inglês falado por 20 minutos por dia"],
      ["Fechar o estágio obrigatório remoto, se possível"],
      ["Plano B: noções de Java e orientação a objetos", "Programas de trainee remotos (BairesDev, Confitec) pedem Java. Só entre aqui se o plano principal não render entrevistas."]
    ],
    milestone: "Pitch pronto e 3 simulações de entrevista feitas" },
  { name: "Ajuste por métricas", weeks: "Semana 16 em diante", var: "--c5",
    goal: "Corrigir o rumo com base no que está acontecendo, e não no que parece estar acontecendo.",
    tasks: [
      ["Manter 5 candidaturas por dia útil"],
      ["Revisar a planilha a cada 2 semanas", "Taxa de resposta, entrevistas e etapas alcançadas."],
      ["Aplicar o ajuste da tabela “Se o resultado não vem”"],
      ["Fazer 1 ou 2 freelas pequenos para ganhar experiência e referência", "Site para um pequeno negócio da região, por exemplo."],
      ["Pedir feedback após cada entrevista, quando possível"],
      ["Atualizar currículo e projetos com o que aprendeu"]
    ],
    milestone: "Primeira oferta de estágio ou vaga" }
];

const KEY = "mapa-primeira-vaga-dev-v1";
let state = {};
try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

function allItems() {
  const out = [];
  STAGES.forEach((s, si) => {
    s.tasks.forEach((t, ti) => out.push({ id: `${si}-${ti}`, si, text: t[0] }));
    out.push({ id: `${si}-m`, si, text: s.milestone, milestone: true });
  });
  return out;
}

function build() {
  const mm = document.getElementById("minimap");
  const stagesEl = document.getElementById("stages");
  mm.innerHTML = STAGES.map((s, i) =>
    `<li id="mm-${i}" style="--sc:var(${s.var})"><a href="#etapa-${i}"><b>${s.name}</b><small>${s.weeks}</small></a></li>`).join("");
  stagesEl.innerHTML = STAGES.map((s, si) => {
    const tasks = s.tasks.map((t, ti) => {
      const id = `${si}-${ti}`;
      return `<li><label class="mtask"><input type="checkbox" data-id="${id}"><span class="dot">${CHECK}</span><span class="txt">${t[0]}${t[1] ? `<span class="hint">${t[1]}</span>` : ""}</span></label></li>`;
    }).join("");
    const ms = `<li class="milestone"><label class="mtask"><input type="checkbox" data-id="${si}-m"><span class="dot">${CHECK}</span><span class="txt"><span class="mtag">Só avance quando</span>${s.milestone}</span></label></li>`;
    return `<section class="stage" id="etapa-${si}" style="--sc:var(${s.var})" aria-labelledby="h-${si}">
      <div class="stage-head"><h2 id="h-${si}">${s.name}</h2><span class="weeks">${s.weeks}</span></div>
      <p class="mgoal">${s.goal}</p>
      <div class="mbar" aria-hidden="true"><i id="bar-${si}"></i></div>
      <ul class="line">${tasks}${ms}</ul>
    </section>`;
  }).join("");
  document.getElementById("stagePills").innerHTML = STAGES.map((s, i) =>
    `<a id="pill-${i}" href="#etapa-${i}" style="--sc:var(${s.var})"><b>${i}</b><span>${s.name}</span><small>0/0</small></a>`).join("");
  stagesEl.addEventListener("change", e => {
    const id = e.target.dataset && e.target.dataset.id;
    if (!id) return;
    if (e.target.checked) state[id] = 1; else delete state[id];
    save(); refresh();
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Apagar todas as marcações?")) { state = {}; save(); sync(); refresh(); }
  });
}

function sync() {
  ROOT.querySelectorAll("input[data-id]").forEach(inp => { inp.checked = !!state[inp.dataset.id]; });
}

function refresh() {
  const items = allItems();
  const done = items.filter(i => state[i.id]).length;
  const pct = Math.round((done / items.length) * 100);
  const circ = 2 * Math.PI * 42;
  document.getElementById("ringFg").setAttribute("stroke-dasharray", `${(pct / 100) * circ} ${circ}`);
  document.getElementById("ringTxt").textContent = pct + "%";
  document.getElementById("totalLabel").textContent = `${done} de ${items.length} estações`;
  STAGES.forEach((s, si) => {
    const its = items.filter(i => i.si === si);
    const d = its.filter(i => state[i.id]).length;
    document.getElementById("bar-" + si).style.width = Math.round((d / its.length) * 100) + "%";
    document.getElementById("mm-" + si).classList.toggle("done", d === its.length);
    var pl = document.getElementById("pill-" + si);
    if (pl) { pl.classList.toggle("done", d === its.length); pl.querySelector("small").textContent = d + "/" + its.length; }
  });
  const next = items.find(i => !state[i.id]);
  const txt = document.getElementById("nextTxt");
  const link = document.getElementById("nextLink");
  if (next) {
    txt.textContent = (next.milestone ? "Marco da etapa: " : "") + next.text;
    link.textContent = "Ir para a etapa " + STAGES[next.si].name;
    link.href = "#etapa-" + next.si;
    link.style.display = "";
  } else {
    txt.textContent = "Mapa concluído. Agora é manter o ritmo até a primeira oferta.";
    link.style.display = "none";
  }
}

build(); sync(); refresh();
if (window.estudosInit) window.estudosInit(STAGES);

var TABS = ['inicio', 'etapas', 'estudos', 'mercado', 'vagas', 'rotina'];
var curStage = null;
function firstOpen() {
  var its = allItems();
  for (var si = 0; si < STAGES.length; si++) {
    if (its.some(function (i) { return i.si === si && !state[i.id]; })) return si;
  }
  return 0;
}
function showStage(n) {
  curStage = n;
  ROOT.querySelectorAll('.stage').forEach(function (s) { s.classList.toggle('on', s.id === 'etapa-' + n); });
  ROOT.querySelectorAll('#stagePills a').forEach(function (a) {
    if (a.id === 'pill-' + n) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
}
function showTab(name) {
  if (name === 'textos') requestAnimationFrame(function () { ROOT.querySelectorAll('#textosBox textarea').forEach(function (t) { t.style.height = 'auto'; t.style.height = (t.scrollHeight + 4) + 'px'; }); });
  ROOT.querySelectorAll('.tabpanel').forEach(function (p) { p.classList.toggle('on', p.dataset.tab === name); });
  ROOT.querySelectorAll('#tabsNav a').forEach(function (a) {
    if (a.dataset.tab === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
function route(first, hh) {
  var h = hh || '';
  var tab = 'inicio', target = null;
  if (TABS.indexOf(h) >= 0) { tab = h; }
  else if (h) {
    var el = document.getElementById(h);
    var p = el && el.closest ? el.closest('.tabpanel') : null;
    if (p) { tab = p.dataset.tab; target = el; }
  }
  showTab(tab);
  if (tab === 'etapas') {
    var n = null;
    if (target && target.classList.contains('stage')) n = +target.id.split('-')[1];
    if (n === null) n = (curStage !== null) ? curStage : firstOpen();
    showStage(n);
    if (target && target.classList.contains('stage')) target = document.getElementById('stagePills');
  }
  requestAnimationFrame(function () {
    if (target) { target.scrollIntoView(); return; }
    if (first) return;
    var y = document.getElementById('tabsAnchor').getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > y) window.scrollTo(0, y);
  });
}
ROOT.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if (!a || !ROOT.contains(a)) return;
  var h = a.getAttribute('href').slice(1);
  if (!h) return;
  e.preventDefault();
  var cm = /^caderno-(\d+)-(\d+)$/.exec(h);
  if (cm && window.estudosOpen) { window.estudosOpen(+cm[1], +cm[2]); route(false, 'estudos'); return; }
  route(false, h);
});
route(true, '');
window.mapaInfo = function () {
  var its = allItems(), done = its.filter(function (i) { return state[i.id]; }).length;
  var next = its.find(function (i) { return !state[i.id]; });
  return { done: done, total: its.length, pct: Math.round(done / its.length * 100),
    next: next ? ((next.milestone ? 'Marco da etapa: ' : '') + next.text) : '',
    si: next ? next.si : -1,
    stages: STAGES.map(function (s, i) { var t = its.filter(function (x) { return x.si === i; }); return { n: s.name, d: t.filter(function (x) { return state[x.id]; }).length, t: t.length }; }) };
};
window.mapaOpen = function (si) { route(false, si >= 0 ? 'etapa-' + si : 'inicio'); };

})();
