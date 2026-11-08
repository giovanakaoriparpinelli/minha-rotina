  (function () {
    var CHECKS = [
      ['c1', 'Pesquisei a Concert Technologies: o que faz, para quem e quais produtos'],
      ['c2', 'Li a vaga e separei os requisitos que eu realmente tenho'],
      ['c3', 'Confirmei quanto falta para eu me formar (a vaga pede pelo menos 1 ano)'],
      ['c4', 'Confirmei meus horários de aula e que consigo 6 horas por dia'],
      ['c5', 'Revisei o básico de Angular, Git e lógica de programação'],
      ['c6', 'Tenho um projeto ou exercício para contar, com começo, meio e fim'],
      ['c7', 'Apresentação de 90 segundos treinada em voz alta'],
      ['c8', 'Simulação completa feita com alguém'],
      ['c9', 'Preparei três perguntas para o recrutador'],
      ['c10', 'Teste de câmera, áudio e internet feito às 9h15']
    ];
    var QA = [
      { id: 'q1', q: 'Fale sobre você', tip: 'Use de 60 a 90 segundos. Passado, presente, futuro: de onde vem, o que faz hoje e por que esta vaga.',
        a: 'Sou a Giovana, estudo Engenharia de Software na UTFPR, em Cornélio Procópio, no [X]º período. Antes de programar, atuei com mapeamento de processos e UX design, e isso me deu o hábito de entender o problema antes de construir a solução.\n\nNa faculdade e por conta própria estudo [lógica, SQL, HTML e CSS, Git, Angular: diga só o que é verdade]. Esta vaga me interessa porque junta inteligência artificial e desenvolvimento full stack: posso começar aprendendo como os dados são preparados e evoluir para construir sistemas completos.' },
      { id: 'q2', q: 'Por que este estágio?', tip: 'Mostre que você leu a vaga: a entrada é com rotulação de imagens e apoio ao cientista de dados, e o caminho é o full stack.',
        a: 'Porque o desenho da vaga faz sentido para quem está começando: aprendo primeiro como os dados de IA são preparados e como um cientista de dados trabalha, e depois evoluo para desenvolver em Angular e .NET. Quero entender o produto de ponta a ponta, e acredito que começar pelos dados me dá uma base melhor para o desenvolvimento.' },
      { id: 'q3', q: 'Por que a Concert Technologies?', tip: 'Cite algo específico do site ou do LinkedIn. Resposta genérica derruba a entrevista.',
        a: 'Pesquisei a Concert e o que mais me chamou atenção foi ver inteligência artificial aplicada a problemas reais de operação crítica. O VERA, por exemplo, usa imagens e IA para identificar árvores que ameaçam a rede elétrica e já é usado por distribuidoras como Energisa e Cemig. Como a vaga começa com rotulação de imagens e apoio ao cientista de dados, eu aprenderia de perto a base desse tipo de produto: dados bem rotulados. Também me identifico com a cultura de autonomia com responsabilidade, que combina com o trabalho remoto, e com o caminho até Angular e .NET, que me permite crescer da área de dados até o desenvolvimento full stack.' },
      { id: 'q4', q: 'Você consegue cumprir 6 horas por dia? E a faculdade?', tip: 'Confirme antes seu horário de aulas. Se houver conflito, diga com clareza e proponha uma solução, em vez de prometer o que não consegue.',
        a: 'Consigo cumprir as 6 horas diárias no período da [manhã/tarde]. Minhas aulas na UTFPR são no período da [manhã/tarde/noite], então [não há conflito / ajusto assim: descreva o ajuste real]. Se houver algum momento de prova ou entrega mais pesado, aviso com antecedência e combino com a equipe.' },
      { id: 'q5', q: 'Como você se organiza para trabalhar remotamente?', tip: 'A vaga pede autonomia. Dê rotina concreta, não adjetivos.',
        a: 'Trabalho com rotina fixa: defino blocos de horário para cada atividade, mantenho uma lista do que preciso entregar e reviso o dia ao final. Uso um planejamento semanal com metas e checklist, e isso me ajuda a cumprir prazos sem precisar de supervisão constante. Quando travo, tento resolver por um tempo e depois peço ajuda de forma objetiva, com o que já tentei.' },
      { id: 'q6', q: 'O que você já conhece de Angular e Git?', tip: 'Seja exata sobre o nível. Dizer o que você já fez e o que está aprendendo é melhor do que inflar.',
        a: 'Sobre Git, [uso para versionar meus projetos: commit, branch, push e pull; já resolvi conflito / estou aprendendo]. Sobre Angular, [já montei X / estou estudando componentes, serviços e rotas e fiz o exercício Y / ainda não tenho projeto, mas estudo por Z]. Aprendo rápido praticando e estou disposta a aprofundar durante o estágio.' },
      { id: 'q7', q: 'Como está a sua lógica de programação? Dê um exemplo', tip: 'Conte um exercício ou projeto real e explique o raciocínio em passos.',
        a: 'Na faculdade e nos meus estudos resolvo problemas com [condicionais, laços, listas e funções]. Um exemplo foi [exercício ou projeto]. Primeiro entendi o que era pedido, depois separei em passos menores, escrevi a solução e testei com casos diferentes, incluindo os que poderiam dar erro.' },
      { id: 'q8', q: 'Você conhece Python, SQL, C#/.NET ou nuvem?', tip: 'São diferenciais, não requisitos. Cite só o que é verdade e mostre vontade de aprender o resto.',
        a: 'Já estudo SQL e consigo [consultas com SELECT, filtros e JOIN: ajuste ao seu nível]. Sobre [Python / C#/.NET / nuvem], [já tive contato com X / ainda não tenho experiência, mas está no meu plano de estudos]. Como a vaga evolui para Angular e .NET, quero aprender C# durante o estágio.' },
      { id: 'q9', q: 'Como você se sente começando por rotulação de imagens?', tip: 'Eles querem saber se você tem paciência e cuidado com tarefa repetitiva. Mostre atenção a detalhe e entendimento de por que a tarefa importa.',
        a: 'Entendo que a rotulação é a base de qualquer modelo de IA: se os dados estiverem errados ou inconsistentes, o resultado do modelo também estará. Tenho atenção a detalhe e disciplina para seguir um padrão. Quando houver dúvida sobre um caso, prefiro perguntar e registrar o critério em vez de adivinhar, para manter a qualidade e a consistência.' },
      { id: 'q10', q: 'Como você lida com feedback e crítica?', tip: 'Traga um exemplo curto e real. Sem exemplo, a resposta soa decorada.',
        a: 'Vejo o feedback como informação para melhorar o trabalho. Procuro entender o motivo, ajusto e confirmo se resolveu. Um exemplo: [situação em que alguém criticou algo seu e o que você mudou]. Aprendi que [o que você levou disso].' },
      { id: 'q11', q: 'Quais são seus pontos fortes e o que você precisa desenvolver?', tip: 'Um ponto forte com prova, e um ponto a desenvolver com ação em andamento.',
        a: 'Meu ponto forte é a organização e a disciplina de estudo: mantenho rotina, metas e acompanho o que entrego. Também gosto de entender o problema antes de agir. O que preciso desenvolver é a experiência prática em projetos reais com um time, e estou compensando com [projetos próprios / estudos de caso / prática em Angular e Git]. Por isso quero este estágio.' },
      { id: 'q12', q: 'Conte uma situação em que algo não saiu como o planejado', tip: 'Escolha um erro pequeno e real, com foco no que você aprendeu e mudou.',
        a: 'Em [projeto ou situação], [o que deu errado]. Percebi que [causa]. Corrigi [o que fez] e passei a [hábito novo]. Desde então [resultado].' },
      { id: 'q13', q: 'Como está o seu inglês?', tip: 'Seja honesta. Se pedirem para trocar para inglês, responda mesmo errando.',
        a: 'Leio documentação técnica em inglês sem grande dificuldade e entendo bem. Estou treinando a fala com regularidade. Se for necessário, posso fazer parte desta conversa em inglês.' },
      { id: 'q14', q: 'Qual a sua pretensão e onde você se vê em dois anos?', tip: 'Sobre valor, alinhe com a bolsa-auxílio e pergunte a faixa da vaga. Sobre futuro, fale de aprendizado.',
        a: 'Minha pretensão é compatível com a bolsa-auxílio prevista para o estágio. Pode me dizer qual é a faixa da vaga?\n\nEm dois anos quero estar desenvolvendo em full stack com autonomia, entendendo bem como a IA se conecta aos produtos, e crescendo dentro de uma equipe como a de vocês.' }
    ];
    var CK = 'mapa-concert-checks-v1', QK = 'mapa-concert-respostas-v1', NK = 'mapa-concert-notas-v1', FK = 'mapa-concert-campos-v1';
    function rd(k) { try { return JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch (e) { return {}; } }
    function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    var checks = rd(CK), mine = rd(QK), notes = rd(NK), fields = rd(FK);
    var CHECK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    var ul = document.getElementById('cvChecks');
    ul.innerHTML = CHECKS.map(function (c) {
      return '<li><label class="mtask" style="--sc:var(--c2)"><input type="checkbox" data-ck="' + c[0] + '"' + (checks[c[0]] ? ' checked' : '') + '><span class="dot">' + CHECK_SVG + '</span><span class="txt">' + esc(c[1]) + '</span></label></li>';
    }).join('');
    ul.addEventListener('change', function (e) {
      var id = e.target && e.target.getAttribute && e.target.getAttribute('data-ck');
      if (!id) return;
      if (e.target.checked) checks[id] = 1; else delete checks[id];
      wr(CK, checks);
    });
    var qa = document.getElementById('cvQA');
    qa.innerHTML = QA.map(function (x, i) {
      return '<details class="qa"><summary>' + (i + 1) + '. ' + esc(x.q) + '</summary><div class="qb"><div class="qL"><p class="tip"><b>Dica.</b> ' + esc(x.tip) + '</p><p class="ans">' + esc(x.a) + '</p></div><div class="qR"><label class="tip" for="cmine-' + x.id + '"><b>Minha versão</b></label><textarea id="cmine-' + x.id + '" data-q="' + x.id + '" placeholder="Escreva aqui a resposta do seu jeito...">' + esc(mine[x.id] || '') + '</textarea></div></div></details>';
    }).join('');
    qa.addEventListener('input', function (e) {
      var id = e.target && e.target.getAttribute && e.target.getAttribute('data-q');
      if (!id) return;
      mine[id] = e.target.value;
      wr(QK, mine);
    });
    var nt = document.getElementById('cvNotes');
    nt.value = notes.t || '';
    nt.addEventListener('input', function () { notes.t = nt.value; wr(NK, notes); });
    ['cvWho', 'cvLink'].forEach(function (id) {
      var el = document.getElementById(id);
      el.value = fields[id] || '';
      el.addEventListener('input', function () { fields[id] = el.value; wr(FK, fields); });
    });
  })();
  
