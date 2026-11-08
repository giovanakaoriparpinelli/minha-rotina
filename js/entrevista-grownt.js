  (function () {
    var CHECKS = [
      ['c1', 'Pesquisei a Grownt Tech: o que faz, para quem, produtos e cultura'],
      ['c2', 'Li a descrição da vaga e separei dois requisitos que eu realmente tenho'],
      ['c3', 'Escolhi o projeto que vou contar (começo, meio e fim)'],
      ['c4', 'Portfólio ou link do Figma abertos e funcionando'],
      ['c5', 'Apresentação de 90 segundos treinada em voz alta'],
      ['c6', 'Simulação completa feita com alguém'],
      ['c7', 'Preparei três perguntas para a Vanessa'],
      ['c8', 'Confirmei meus horários de aula e o que posso oferecer de carga'],
      ['c9', 'Teste do Teams, câmera, áudio e internet feito'],
      ['c10', 'Água, caderno e a vaga abertos na hora da entrevista']
    ];
    var QA = [
      { id: 'q1', q: 'Fale sobre você', tip: 'Use de 60 a 90 segundos. Passado, presente, futuro: de onde vem, o que faz hoje e por que esta vaga.',
        a: 'Sou a Giovana, estudo Engenharia de Software na UTFPR, em Cornélio Procópio, no [X]º período. Antes de programar, atuei com mapeamento de processos e UX design, e foi aí que percebi que gosto de entender o problema de quem usa um produto antes de pensar na solução.\n\nPor isso o estágio de Product Designer me chama atenção: junto o olhar de usuário e de processo com a base técnica da faculdade, o que facilita a conversa com quem desenvolve. Hoje estou [praticando Figma / montando meu portfólio / descreva o que é verdade]. Quero aprender com um time de produto e contribuir com tarefas reais desde cedo.' },
      { id: 'q2', q: 'Por que design de produto, se você estuda Engenharia de Software?', tip: 'É a pergunta mais provável. Responda com segurança e sem se desculpar. Não diga que é “porta de entrada” para outra área.',
        a: 'Porque é onde as duas coisas que já fiz se encontram: a experiência com UX e processos e o que aprendo na faculdade. Entender de código me ajuda a propor soluções que o time consegue construir e a conversar de igual para igual com quem desenvolve. Mas o que me motiva é o problema do usuário, e é por isso que quero começar pelo design de produto.' },
      { id: 'q3', q: 'Por que a Grownt Tech?', tip: 'Cite algo específico que você leu no site ou no LinkedIn. Resposta genérica derruba a entrevista.',
        a: 'Pesquisei a Grownt Tech e me chamou atenção [um produto, cliente, valor ou projeto específico que você encontrou]. Quero trabalhar em um lugar onde [o que isso permite aprender, ex.: design e desenvolvimento trabalham juntos]. Além disso, a vaga pede [requisito da vaga] e isso é o que eu estudo e pratico hoje.' },
      { id: 'q4', q: 'Conte sobre sua experiência com UX e mapeamento de processos', tip: 'Use a estrutura SCRA: Situação, Cargo ou tarefa, Ação, Resultado. Uma entrega concreta vale mais que uma lista de funções.',
        a: 'Atuei com [mapeamento de processos / UX design] em [empresa ou projeto], de [mês/ano] a [mês/ano]. A situação era [problema ou necessidade]. Minha tarefa foi [o que ficou sob sua responsabilidade]. Eu [o que você fez, ex.: entrevistei usuários, desenhei o fluxo, documentei os processos]. O resultado foi [entrega ou melhoria, com número se existir].' },
      { id: 'q5', q: 'Como é o seu processo de design?', tip: 'Mostre que você não começa pela tela. Cinco ou seis etapas, em linguagem simples.',
        a: 'Começo entendendo o problema e quem sofre com ele, conversando com usuários ou observando o fluxo atual. Depois defino o que precisa ser resolvido e o que é prioridade. Faço rascunhos e wireframes para testar ideias rápido, monto um protótipo no [Figma] e testo com pessoas reais. Ajusto com o que aprendi e, ao entregar para o desenvolvimento, acompanho para o resultado final ficar fiel ao que foi pensado.' },
      { id: 'q6', q: 'Conte sobre um projeto do seu portfólio', tip: 'Escolha um só. Fale do problema antes da tela bonita, e diga o que você faria diferente hoje.',
        a: 'Vou contar o projeto [nome]. O problema era [qual]. Meu papel foi [o que você fez, seja honesta sobre o que foi seu e o que foi do grupo]. Eu [pesquisa, fluxo, protótipo, teste]. O que aprendi foi [aprendizado]. Hoje eu faria diferente [uma melhoria real], porque [motivo].' },
      { id: 'q7', q: 'Quais ferramentas você usa?', tip: 'Diga o que você realmente usa. Dizer que está aprendendo uma ferramenta é aceitável em estágio; inventar nível, não.',
        a: 'Uso o [Figma] para telas e protótipos, e [FigJam / Miro / Notion / papel] para fluxos e ideias. Estou aprendendo [componentes e auto layout / design system]. Como estudo software, também tenho facilidade com HTML e CSS, o que me ajuda a entender o que é simples ou difícil de implementar.' },
      { id: 'q8', q: 'Como você faria pesquisa com usuários?', tip: 'Mostre método simples e viável para um time pequeno.',
        a: 'Começaria com conversas curtas de 20 a 30 minutos com cinco ou seis usuários, perguntando sobre o que fazem hoje e onde travam, e não sobre o que eles querem na tela. Depois testaria o protótipo pedindo que executem tarefas reais enquanto observo onde hesitam. Cinco pessoas já mostram a maioria dos problemas de uso.' },
      { id: 'q9', q: 'Como você trabalha com desenvolvedores?', tip: 'Aqui a sua formação é uma vantagem. Use.',
        a: 'Converso cedo, antes de fechar a tela, para saber o que é viável. Como estudo Engenharia de Software, entendo limites técnicos e consigo explicar minhas decisões sem esconder trade-offs. Se algo não puder ser feito como desenhei, prefiro negociar uma alternativa que preserve o objetivo do usuário.' },
      { id: 'q10', q: 'Como você lida com feedback e crítica?', tip: 'Traga um exemplo curto e real. Sem exemplo, a resposta soa decorada.',
        a: 'Vejo o feedback como dado sobre o trabalho, não sobre mim. Procuro entender o motivo por trás dele e decido o que ajustar. Um exemplo: [situação em que alguém criticou algo seu e o que você mudou]. Aprendi que [o que você levou disso].' },
      { id: 'q11', q: 'Quais são seus pontos fortes e o que você precisa desenvolver?', tip: 'Um ponto forte com prova, e um ponto a desenvolver com ação em andamento.',
        a: 'Meu ponto forte é entender o problema antes de resolvê-lo, por causa da experiência com processos e UX. Também tenho disciplina de estudo e aprendo bem praticando. O que preciso desenvolver é a experiência em produto real, com prazos e time. Estou compensando com [projetos próprios / estudos de caso / prática no Figma] e por isso busco este estágio.' },
      { id: 'q12', q: 'Qual a sua disponibilidade? E a pretensão?', tip: 'Confirme antes seu horário de aulas. Sobre valor, fale em linha com a bolsa-auxílio e pergunte a faixa da empresa.',
        a: 'Consigo estagiar [X] horas por dia, no período da [manhã/tarde], de forma [remota/presencial/híbrida]. Minhas aulas na UTFPR são no período da [manhã/tarde/noite]. Sobre valor, minha pretensão é compatível com a bolsa-auxílio prevista para o estágio. Pode me dizer qual é a faixa da vaga?' },
      { id: 'q13', q: 'Como está o seu inglês?', tip: 'Seja honesta. Se a Vanessa trocar para inglês, responda mesmo errando. Tentar vale mais do que travar.',
        a: 'Leio documentação técnica em inglês sem dificuldade e entendo bem conversas. Estou treinando a fala todos os dias. Se for necessário, posso fazer parte desta conversa em inglês.' },
      { id: 'q14', q: 'Onde você se vê em dois anos?', tip: 'Fale de aprendizado e de contribuição. Evite prometer fidelidade que você não sabe se terá, e evite parecer que quer sair logo.',
        a: 'Em dois anos quero ter participado de projetos de ponta a ponta, do problema ao produto no ar, e ser alguém em quem o time confia para entregar. Quero seguir aprendendo, tanto de design quanto de produto, e de preferência crescendo dentro de um time como o de vocês.' },
      { id: 'q15', q: 'Conte uma situação em que algo não saiu como o planejado', tip: 'Escolha um erro pequeno e real, com foco no que você aprendeu e mudou.',
        a: 'Em [projeto], [o que deu errado]. Percebi que [causa]. Corrigi [o que fez] e passei a [hábito novo]. Desde então [resultado].' }
    ];
    var CK = 'mapa-entrevistas-checks-v1', QK = 'mapa-entrevistas-respostas-v1', NK = 'mapa-entrevistas-notas-v1';
    function rd(k) { try { return JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch (e) { return {}; } }
    function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    var checks = rd(CK), mine = rd(QK), notes = rd(NK);
    var CHECK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    var ul = document.getElementById('ivChecks');
    ul.innerHTML = CHECKS.map(function (c) {
      return '<li><label class="mtask" style="--sc:var(--c2)"><input type="checkbox" data-ck="' + c[0] + '"' + (checks[c[0]] ? ' checked' : '') + '><span class="dot">' + CHECK_SVG + '</span><span class="txt">' + esc(c[1]) + '</span></label></li>';
    }).join('');
    ul.addEventListener('change', function (e) {
      var id = e.target && e.target.getAttribute && e.target.getAttribute('data-ck');
      if (!id) return;
      if (e.target.checked) checks[id] = 1; else delete checks[id];
      wr(CK, checks);
    });
    var qa = document.getElementById('ivQA');
    qa.innerHTML = QA.map(function (x, i) {
      return '<details class="qa"><summary>' + (i + 1) + '. ' + esc(x.q) + '</summary><div class="qb"><div class="qL"><p class="tip"><b>Dica.</b> ' + esc(x.tip) + '</p><p class="ans">' + esc(x.a) + '</p></div><div class="qR"><label class="tip" for="mine-' + x.id + '"><b>Minha versão</b></label><textarea id="mine-' + x.id + '" data-q="' + x.id + '" placeholder="Escreva aqui a resposta do seu jeito...">' + esc(mine[x.id] || '') + '</textarea></div></div></details>';
    }).join('');
    qa.addEventListener('input', function (e) {
      var id = e.target && e.target.getAttribute && e.target.getAttribute('data-q');
      if (!id) return;
      mine[id] = e.target.value;
      wr(QK, mine);
    });
    var nt = document.getElementById('ivNotes');
    nt.value = notes.t || '';
    nt.addEventListener('input', function () { notes.t = nt.value; wr(NK, notes); });
  })();
  
