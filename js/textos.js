  (function () {
    var GROUPS = [
      { t: 'Apresentações', items: [
        { id: 'curta', t: 'Apresentação curta (campos com limite de caracteres)', x: `Estudante de Engenharia de Software na UTFPR ([semestre]º período), com base em lógica de programação, C, HTML, CSS e SQL. Venho de uma experiência com mapeamento de processos e UX, e estou aprendendo JavaScript e Git. Busco estágio remoto em [área].` },
        { id: 'media', t: 'Apresentação média (campo “fale sobre você”)', x: `Sou estudante de Engenharia de Software na UTFPR (Cornélio Procópio, PR), no [semestre]º período, com previsão de formatura em [mês/ano].

Tenho base em lógica de programação e linguagem C, conhecimentos básicos de HTML e CSS e experiência com SQL (criação de tabelas, consultas e alterações). Antes de programar, atuei com mapeamento de processos e UX design, o que me ajuda a entender o problema de quem usa o sistema antes de escrever código.

Hoje estou aprofundando JavaScript e Git. [Se já tiver projeto publicado: Meus projetos estão no GitHub: link.] Leio documentação técnica em inglês sem dificuldade e estou treinando a conversação.

Procuro um estágio remoto em [desenvolvimento / QA / implantação] para aprender com um time e contribuir com tarefas reais desde cedo.` },
        { id: 'recrutador', t: 'Mensagem ao recrutador (e-mail ou LinkedIn)', x: `Assunto: Candidatura: [nome da vaga] | [seu nome]

Olá, [nome do recrutador]!

Vi a vaga de [nome da vaga] na [empresa] e já me candidatei. Sou estudante de Engenharia de Software na UTFPR e tenho base em [dois requisitos da vaga que você realmente tem, ex.: SQL e lógica de programação]. Também tenho experiência anterior com mapeamento de processos e UX, que me ajuda a [ligação com a vaga, ex.: entender requisitos e cenários de teste].

GitHub: [link]
LinkedIn: [link]

Fico à disposição para conversar. Desde já, agradeço a atenção.
[seu nome]` }
      ] },
      { t: 'Respostas de formulário', items: [
        { id: 'porque', t: 'Por que quer esta vaga?', x: `A vaga de [vaga] na [empresa] combina com o que estou construindo: [requisito 1] e [requisito 2] são o que estudo e pratico hoje. Também me atrai [algo específico que você leu no anúncio ou no site, ex.: trabalhar em squads ágeis]. Quero aprender com um time e entregar tarefas reais desde cedo.` },
        { id: 'fortes', t: 'Pontos fortes', x: `Entendo o problema antes de resolvê-lo, por causa da minha experiência com processos e UX. Tenho organização e disciplina de estudo, e aprendo bem lendo documentação e praticando em projetos.` },
        { id: 'desenvolver', t: 'Ponto a desenvolver', x: `Tenho pouca experiência profissional em programação. Estou compensando com estudo diário e projetos próprios ([X] horas por semana).` },
        { id: 'experiencia', t: 'Experiência anterior', x: `Atuei com [mapeamento de processos / UX design] em [empresa ou projeto], de [mês/ano] a [mês/ano]. Nessa função, [uma entrega concreta, ex.: documentei X processos e propus melhorias no fluxo de Y].` },
        { id: 'disponibilidade', t: 'Disponibilidade', x: `Posso estagiar [X] horas por dia, no período da [manhã/tarde], de forma remota. Minhas aulas na UTFPR são no período da [manhã/tarde/noite].` },
        { id: 'salario', t: 'Pretensão salarial', x: `Compatível com a bolsa-auxílio prevista para o estágio.` },
        { id: 'ingles', t: 'Inglês', x: `Nível intermediário: leio documentação técnica e entendo bem conversas, e estou treinando a fala.` }
      ] },
      { t: 'Troque uma frase conforme a área da vaga', items: [
        { id: 'area-dev', t: 'Desenvolvimento', x: `Estou aprendendo JavaScript e construindo projetos web para praticar.` },
        { id: 'area-qa', t: 'QA (use só depois de estudar esses itens na etapa 1)', x: `Tenho atenção a detalhes e olhar de processos, e estudo casos de teste, relato de bugs, Jira e Postman. Uso SQL para consultar dados.` },
        { id: 'area-impl', t: 'Implantação ou suporte', x: `Gosto de entender o processo do cliente, levantar requisitos e documentar. Tenho experiência com mapeamento de processos e uso SQL para consultas.` }
      ] },
      { t: 'Versão em inglês', items: [
        { id: 'en', t: 'Apresentação em inglês (para vagas que pedem)', x: `I’m a Software Engineering student at UTFPR (Brazil), with a foundation in programming logic, C, HTML, CSS and SQL. Before programming, I worked with process mapping and UX design, which helps me understand users’ problems before writing code. I’m currently learning JavaScript and Git. I read technical English comfortably and I’m improving my speaking. I’m looking for a remote internship in [area].` }
      ] }
    ];
    var SK = 'mapa-textos-candidatura-v1', saved = {};
    try { saved = JSON.parse(localStorage.getItem(SK) || '{}') || {}; } catch (e) { saved = {}; }
    function persist() { try { localStorage.setItem(SK, JSON.stringify(saved)); } catch (e) {} }
    function pend(v) { return (v.match(/\[[^\]]*\]/g) || []).length; }
    function meta(el, v) {
      var n = pend(v);
      el.textContent = n === 0 ? 'Sem campos pendentes. Pronto para copiar.' : (n === 1 ? '1 campo entre colchetes para preencher.' : n + ' campos entre colchetes para preencher.');
    }
    function fit(ta) { ta.style.height = 'auto'; ta.style.height = (ta.scrollHeight + 4) + 'px'; }
    function copyText(v, ta) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(v).catch(function () { return legacy(ta); });
      }
      return Promise.resolve(legacy(ta));
    }
    function legacy(ta) {
      ta.focus(); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      if (!ok) throw new Error('copy failed');
    }
    var box = document.getElementById('textosBox');
    GROUPS.forEach(function (g) {
      var wrap = document.createElement('div'); wrap.className = 'cgroup';
      var h = document.createElement('h3'); h.textContent = g.t; wrap.appendChild(h);
      var grid = document.createElement('div'); grid.className = 'cgrid'; wrap.appendChild(grid);
      g.items.forEach(function (it) {
        var card = document.createElement('article'); card.className = 'copycard';
        var head = document.createElement('header');
        var t = document.createElement('h4'); t.textContent = it.t; head.appendChild(t);
        var btns = document.createElement('div'); btns.className = 'cbtns';
        var restore = document.createElement('button'); restore.type = 'button'; restore.className = 'cbtn ghost'; restore.textContent = 'Restaurar modelo';
        var copy = document.createElement('button'); copy.type = 'button'; copy.className = 'cbtn'; copy.textContent = 'Copiar';
        btns.appendChild(restore); btns.appendChild(copy); head.appendChild(btns);
        var ta = document.createElement('textarea'); ta.value = saved[it.id] != null ? saved[it.id] : it.x;
        ta.setAttribute('aria-label', it.t); ta.spellcheck = true;
        var m = document.createElement('div'); m.className = 'cmeta'; m.setAttribute('aria-live', 'polite');
        card.appendChild(head); card.appendChild(ta); card.appendChild(m); grid.appendChild(card);
        meta(m, ta.value);
        ta.addEventListener('input', function () {
          if (ta.value === it.x) delete saved[it.id]; else saved[it.id] = ta.value;
          persist(); meta(m, ta.value); fit(ta);
        });
        copy.addEventListener('click', function () {
          Promise.resolve().then(function () { return copyText(ta.value, ta); }).then(function () {
            copy.textContent = 'Copiado'; copy.classList.add('ok');
            setTimeout(function () { copy.textContent = 'Copiar'; copy.classList.remove('ok'); }, 1800);
          }).catch(function () {
            ta.focus(); ta.select(); m.textContent = 'Não consegui copiar sozinho. O texto está selecionado: use Ctrl+C (ou Copiar no menu do celular).';
          });
        });
        restore.addEventListener('click', function () {
          if (ta.value === it.x) return;
          if (confirm('Voltar este texto ao modelo original? Suas edições serão perdidas.')) {
            ta.value = it.x; delete saved[it.id]; persist(); meta(m, ta.value); fit(ta);
          }
        });
      });
      box.appendChild(wrap);
    });
    box.querySelectorAll('textarea').forEach(fit);
  })();
  
