"use strict";
var KEY="rotina-amorarte-v1";
var $=function(s){return document.querySelector(s)};
var pad=function(n){return String(n).padStart(2,"0")};
var iso=function(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())};
var parse=function(s){var a=s.split("-").map(Number);return new Date(a[0],a[1]-1,a[2])};
var addDays=function(s,n){var d=parse(s);d.setDate(d.getDate()+n);return iso(d)};
var DOW=["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
var DS=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
var MON=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var uid=function(){return "x"+Math.random().toString(36).slice(2,9)};
var fmtDM=function(s){var d=parse(s);return pad(d.getDate())+"/"+pad(d.getMonth()+1)};
var TODAY=iso(new Date());

var CATS={fe:["Fé",""],saude:["Corpo",""],comida:["Refeição",""],ent:["Entrevista",""],tcc:["TCC",""],dev:["Dev",""],ing:["Inglês",""],leve:["Leve",""],sono:["Sono",""]};
var STICKERS=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
var W=[1,2,3,4,5],ALL=[0,1,2,3,4,5,6];

function defTasks(){
  var x3="2026-11-03",x4="2026-11-04";
  return [
  {id:"wake",t:"Acordar + leitura da Bíblia",em:"",s:"06:00",e:"06:30",cat:"fe",days:W,h:"biblia",note:"30 min de calma antes do dia começar"},
  {id:"wake_sat",t:"Acordar + leitura da Bíblia",em:"",s:"07:00",e:"07:30",cat:"fe",days:[6],h:"biblia"},
  {id:"wake_sun",t:"Acordar + leitura da Bíblia",em:"",s:"08:00",e:"08:30",cat:"fe",days:[0],h:"biblia",note:"Domingo sem pressa"},
  {id:"cafe",t:"Café da manhã",em:"",s:"06:30",e:"06:50",cat:"comida",days:W,note:"Antes do cross"},
  {id:"cafe_sat",t:"Café antes do aulão",em:"",s:"07:30",e:"07:50",cat:"comida",days:[6]},
  {id:"cafe_sun",t:"Café da manhã",em:"",s:"08:30",e:"09:00",cat:"comida",days:[0]},
  {id:"cross",t:"CrossFit",em:"",s:"07:00",e:"08:00",cat:"saude",days:W,except:[x3],h:"cross"},
  {id:"cross_sat",t:"Aulão de CrossFit",em:"",s:"08:00",e:"09:00",cat:"saude",days:[6],h:"cross"},
  {id:"cross_hoje",t:"CrossFit da noite",em:"",s:"20:00",e:"21:00",cat:"saude",only:x3,h:"cross",note:"Só hoje o treino é às 20h"},
  {id:"banho",t:"Banho + voltar pra casa",em:"",s:"08:00",e:"08:30",cat:"leve",days:W,except:[x3]},
  {id:"news",t:"Notícias do dia",em:"",s:"08:30",e:"08:40",cat:"leve",days:W,except:[x3],h:"noticias",note:"5 a 10 min, só o essencial"},
  {id:"amor",t:"Vagas e estudos",em:"",s:"08:40",e:"11:00",cat:"dev",days:W,except:[x3,"2026-11-09","2026-11-10"]},
  {id:"o_news3",t:"Notícias do dia",em:"",s:"06:50",e:"07:00",cat:"leve",only:x3,h:"noticias"},
  {id:"banho_sat",t:"Banho + notícias",em:"",s:"09:00",e:"09:30",cat:"leve",days:[6],h:"noticias"},
  {id:"news_sun",t:"Notícias do dia",em:"",s:"09:00",e:"09:10",cat:"leve",days:[0],h:"noticias"},
  {id:"livre",t:"Hora de sobra: respirar, ler ou adiantar algo",em:"",s:"11:00",e:"12:00",cat:"leve",days:W,note:"Sobra do horário de almoço"},
  {id:"almoco",t:"Almoço na casa da sogra",em:"",s:"12:00",e:"13:00",cat:"comida",days:ALL},
  {id:"tcc",t:"TCC: ajustes da orientadora",em:"",s:"13:15",e:"16:45",cat:"tcc",days:W,until:"2026-11-06",note:"Entrega na sexta"},
  {id:"amor_t",t:"Vagas e candidaturas",em:"",s:"13:15",e:"15:15",cat:"dev",days:W,from:"2026-11-09"},
  {id:"dev_t",t:"Estudos de dev (tarde)",em:"",s:"15:30",e:"16:45",cat:"dev",days:W,from:"2026-11-09"},
  {id:"lanche",t:"Lanche da tarde",em:"",s:"16:45",e:"17:00",cat:"comida",days:W},
  {id:"run",t:"Corrida de 30 a 40 min (se estiver folgado)",em:"",s:"17:15",e:"17:55",cat:"saude",days:[1,3,5],opt:true,h:"corrida"},
  {id:"run_sun",t:"Corrida de 30 a 40 min (se estiver folgado)",em:"",s:"09:30",e:"10:10",cat:"saude",days:[0],opt:true,h:"corrida"},
  {id:"o_dev3",t:"Estudos de desenvolvimento",em:"",s:"17:15",e:"19:30",cat:"dev",only:x3,note:"Adiantado por causa do cross às 20h"},
  {id:"ing",t:"Aula de inglês",em:"",s:"18:00",e:"19:00",cat:"ing",days:[4],h:"ingles"},
  {id:"dev",t:"Estudos de desenvolvimento",em:"",s:"19:15",e:"21:30",cat:"dev",days:W,except:[x3],note:"Inglês, estudo novo, prática e candidaturas. Veja a aba Desenvolvimento"},
  {id:"dev_sat",t:"Estudos de desenvolvimento",em:"",s:"15:00",e:"17:20",cat:"dev",days:[6]},
  {id:"o_banho3",t:"Banho pós-cross",em:"",s:"21:00",e:"21:30",cat:"leve",only:x3},
  {id:"plan_sun",t:"Planejar a semana (15 min)",em:"",s:"16:00",e:"16:15",cat:"dev",days:[0],note:"Atualizar planilha de candidaturas e escolher o foco"},
  {id:"leitura",t:"Ler algumas páginas do livro",em:"",s:"21:45",e:"22:15",cat:"leve",days:ALL,h:"leitura"},
  {id:"desacelerar",t:"Desligar telas e arrumar o dia seguinte",em:"",s:"22:15",e:"23:00",cat:"sono",days:ALL},
  {id:"sono",t:"Dormir (limite 23:30)",em:"",s:"23:00",e:"23:30",cat:"sono",days:ALL,h:"sono",note:"Meta: deitar antes das 23:30"}
  ].concat(newTasks());
}
function newTasks(){return [
  {id:"ent_concert",t:"Entrevista: Estágio IA e Full Stack (Concert Technologies)",det:"Concert Technologies · remoto · confirmar link e duração",em:"",s:"09:30",e:"10:30",cat:"ent",imp:true,only:"2026-11-09"},
  {id:"o_v09a",t:"Vagas e estudos",em:"",s:"08:40",e:"09:15",cat:"dev",only:"2026-11-09",note:"Revisar a apresentação e testar câmera e áudio"},
  {id:"o_v09b",t:"Vagas e estudos",em:"",s:"10:30",e:"11:00",cat:"dev",only:"2026-11-09"},
  {id:"ent_grownt",t:"Entrevista: Product Designer (Estagiário)",det:"Empresa grownt · Microsoft Teams · Com Vanessa Santos",em:"",s:"10:00",e:"10:30",cat:"ent",imp:true,only:"2026-11-10"},
  {id:"o_v10a",t:"Vagas e estudos",em:"",s:"08:40",e:"10:00",cat:"dev",only:"2026-11-10"},
  {id:"o_v10b",t:"Vagas e estudos",em:"",s:"10:30",e:"11:00",cat:"dev",only:"2026-11-10"}
  ];}
function defHabits(){return [
  {id:"agua",em:"",name:"Água (3 L)",kind:"count",goal:3000,unit:"ml",step:250},
  {id:"biblia",em:"",name:"Bíblia (30 min)",kind:"check"},
  {id:"noticias",em:"",name:"Notícias do dia",kind:"check"},
  {id:"leitura",em:"",name:"Páginas do livro",kind:"count",goal:10,unit:"págs",step:5},
  {id:"cross",em:"",name:"CrossFit",kind:"check"},
  {id:"ingles",em:"",name:"Inglês (20 min)",kind:"check"},
  {id:"corrida",em:"",name:"Corrida (30–40 min)",kind:"check",weekly:3},
  {id:"sono",em:"",name:"Dormir antes das 23:30",kind:"check"}
];}
function defTcc(){
  var T=[
  ["A. Pré-textuais","p. 3","Remover a folha de aprovação em branco desta versão","Sex 06/11"],
  ["A. Pré-textuais","p. 4","Reescrever o Resumo no passado/presente: objetivo, bases (IEEE Xplore e Google Scholar) e período, números até o corpus de 127, achados por QP e limitações","Sex 06/11"],
  ["A. Pré-textuais","p. 4","“leaky pipeline” em itálico em todo o texto","Sex 06/11"],
  ["A. Pré-textuais","p. 4","Retirar “profundas” de “raízes históricas profundas” (confirmar com a orientadora se houver dúvida)","Sex 06/11"],
  ["A. Pré-textuais","p. 4","Palavras-chave: Mulheres; STEM; Evasão; Engenharia de Software; Mapeamento Sistemático da Literatura","Sex 06/11"],
  ["A. Pré-textuais","p. 5","Abstract e Keywords alinhados (Women; STEM; Attrition; Software Engineering; Systematic Literature Mapping), como tradução fiel do novo Resumo","Sex 06/11"],
  ["B. Introdução","p. 13","Reformular a questão principal: “impactam” sugere causalidade. Sintetizar impactos, associações e mecanismos relatados e alinhar objetivos, discussão e Resumo","Ter 03/11"],
  ["C. Metodologia","p. 25","Google Scholar (“instabilidade técnica”): destacar a limitação ao interpretar os achados ou delimitar as conclusões ao corpus","Qua 04/11"],
  ["C. Metodologia","p. 27","6 estudos mantidos “com ressalva”: reavaliar pelos critérios originais. Excluir e atualizar números, ou manter com regra e razão individual","Ter 03/11"],
  ["C. Metodologia","p. 28","“garantiu”: reformular como contribuição metodológica e manter visíveis as limitações","Qua 04/11"],
  ["C. Metodologia","p. 28","“A primeira é epistêmica…”: o protocolo torna as decisões rastreáveis; a confiabilidade depende de cobertura, acesso e consistência","Qua 04/11"],
  ["D. Resultados e Discussão","p. 30","Conferir os quantitativos (335…) contra a planilha de triagem e o PRISMA, iguais em todo o documento","Ter 03/11"],
  ["D. Resultados e Discussão","p. 30","121 estudos + 6 com ressalva: mesma decisão do item 9; atualizar 127 / 121 / 6 onde aparecerem","Ter 03/11"],
  ["D. Resultados e Discussão","p. 40","QP5 (11 estudos, 8,7%): interpretar junto às limitações; usar “não foram identificadas no corpus selecionado”","Qua 04/11"],
  ["D. Resultados e Discussão","p. 45","“a contribuição deste MSL é dupla”: restringir às revisões identificadas no corpus e incluir quadro comparativo","Qua 04/11"],
  ["E. Cronograma","p. 47–48","Remover o Cap. 5 inteiro (texto, Quadro 2, fases). Considerações Finais vira Cap. 5; atualizar sumário, lista de quadros e estrutura na Introdução","Qui 05/11"],
  ["F. Considerações Finais","p. 49","Reorganizar: (a) resposta à pergunta, (b) achados QP1–QP5, (c) objetivos, (d) contribuição, (e) limitações, (f) trabalhos futuros","Qui 05/11"],
  ["F. Considerações Finais","p. 50","“Nenhuma das 11 soluções…”: restringir ao corpus, sem sugerir que não existe na literatura em geral","Qui 05/11"],
  ["G. Referências","p. 58","ODUN-AYO et al. (EDUCON 2024): tirar “CONFERIR”, completar local, editora, páginas e DOI; varredura final da lista","Sex 06/11"]
  ];
  return T.map(function(r,i){return {id:"tcc"+(i+1),n:i+1,g:r[0],pg:r[1],t:r[2],plan:r[3],done:false}});
}
function defMauro(){
  var M=[
  ["2026-11-04","Carrossel","Crédito rural: cédula rural (retomada)"],
  ["2026-11-06","Carrossel","Consumidor: nome negativado"],
  ["2026-11-11","Reels","Trabalhista: demitido sem justa causa"],
  ["2026-11-13","Carrossel","Família: pensão alimentícia"],
  ["2026-11-18","Reels","Imobiliário: usucapião"],
  ["2026-11-20","Reels","Institucional: um dia de advogado (feriado)"],
  ["2026-11-25","Reels","Criminal: preso em flagrante"],
  ["2026-11-27","Carrossel","Consumidor: Black Friday"]
  ];
  return M.map(function(r,i){return {id:"m"+i,d:r[0],f:r[1],t:r[2],st:0}});
}
function defGym(){return [
  ["Combinar com o dono: onde posso gravar, quais cenas e autorização de imagem dos alunos","Antes"],
  ["Carregar a bateria e liberar espaço no celular/câmera","Antes"],
  ["Limpar a lente, gravar na vertical (9:16) e travar foco e exposição","Antes"],
  ["Take: fachada e entrada da academia","Takes"],
  ["Take: aquecimento e alongamento do grupo","Takes"],
  ["Take: detalhes (barra, anilhas, magnésio, cronômetro, suor)","Takes"],
  ["Take: coach explicando o treino do dia","Takes"],
  ["Take: WOD em ação, de perto e de longe","Takes"],
  ["Take: final da aula, high five e sorrisos","Takes"],
  ["Gravar 3 a 5 segundos a mais no início e no fim de cada take","Takes"],
  ["Anotar: diferenciais da academia, horários, planos e o que o dono quer mostrar","Conversa"],
  ["Combinar valor do serviço e próximo passo (proposta e prazo de entrega)","Conversa"],
  ["Fazer backup dos arquivos e escolher os melhores takes","Depois"],
  ["Enviar uma prévia curta para o dono","Depois"]
  ].map(function(r,i){return {id:"g"+i,t:r[0],g:r[1],done:false}});
}
function defaults(){return {bib:defBib(),cancel:{},stage:0,marco:{},v:1,tasks:defTasks(),habits:defHabits(),done:{},log:{},heavy:{},lists:{tcc:defTcc()},dev:{},devScale:1,theme:""};}
var VERSES=[
["Posso todas as coisas em Cristo que me fortalece.","Filipenses 4:13"],
["O Senhor é o meu pastor, nada me faltará.","Salmos 23:1"],
["Esforça-te, e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor teu Deus é contigo, por onde quer que andares.","Josué 1:9"],
["Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.","Provérbios 3:5"],
["Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo.","Isaías 41:10"],
["Mas buscai primeiro o Reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.","Mateus 6:33"],
["Entrega o teu caminho ao Senhor; confia nele, e ele o fará.","Salmos 37:5"],
["Levantarei os meus olhos para os montes, de onde vem o meu socorro. O meu socorro vem do Senhor, que fez o céu e a terra.","Salmos 121:1-2"],
["Entrega ao Senhor as tuas obras, e teus pensamentos serão estabelecidos.","Provérbios 16:3"],
["Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.","Mateus 11:28"],
["Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.","1 Pedro 5:7"],
["Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.","Eclesiastes 3:1"],
["Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.","Salmos 46:1"],
["E tudo quanto fizerdes, fazei-o de coração, como ao Senhor, e não aos homens.","Colossenses 3:23"],
["Mas os que esperam no Senhor renovarão as suas forças, subirão com asas como águias; correrão, e não se cansarão.","Isaías 40:31"],
["Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.","Salmos 119:105"],
["E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e será dada.","Tiago 1:5"],
["Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.","Mateus 7:7"],
["Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.","2 Timóteo 1:7"],
["Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz, e não de mal.","Jeremias 29:11"]
];
var VI=Math.floor(Math.random()*VERSES.length);
var STG=[
 ["Diagnóstico","Semana 1","Descobrir o que o mercado pede e deixar a base pronta.","Stack escolhida, perfis criados e planilha pronta"],
 ["Fundamentos","Semanas 2 a 6","Dominar o básico de JavaScript e Git e publicar o primeiro projeto.","Projeto 1 publicado, com README"],
 ["Primeiras candidaturas","A partir da semana 4","Começar a se candidatar cedo e abrir a rede de contatos.","30 candidaturas enviadas e rede de contatos aberta"],
 ["Projeto principal","Semanas 7 a 14","Construir uma aplicação completa com código, processos e UX.","Projeto 2 no ar, com testes básicos e README"],
 ["Preparação para entrevistas","Semanas 12 a 18","Chegar à entrevista segura: lógica, equipe e inglês.","Pitch pronto e 3 simulações de entrevista feitas"],
 ["Ajuste por métricas","Semana 16 em diante","Corrigir o rumo com base no que está acontecendo.","Primeira oferta de estágio ou vaga"]
];
function defCli(){return {sel:"all",list:[{id:"mauro",n:"Dr. Mauro",c:"#E07A4E"},{id:"gym",n:"Academia",c:"#6C8EE8"},{id:"posto",n:"Posto Potencial",c:"#45B58B"}],
 tasks:[
 {id:"c1",c:"mauro",t:"Aprovar o planejamento de novembro",due:"2026-11-04",done:false},
 {id:"c2",c:"mauro",t:"Gravar os 4 Reels no escritório",due:"2026-11-09",done:false},
 {id:"c3",c:"mauro",t:"Editar os Reels de 11, 18, 20 e 25/11",due:"2026-11-10",done:false},
 {id:"c4",c:"mauro",t:"Agendar os conteúdos de 18 a 27/11",due:"2026-11-16",done:false},
 {id:"c5",c:"mauro",t:"Relatório do mês e ajustes para dezembro",due:"2026-11-30",done:false},
 {id:"c6",c:"gym",t:"Combinar valor e proposta",due:"2026-11-05",done:false},
 {id:"c7",c:"gym",t:"Editar os takes e enviar uma prévia",due:"2026-11-09",done:false},
 {id:"c8",c:"posto",t:"Planejar o conteúdo de novembro",due:"2026-11-10",done:false}
 ]};}
var S;
function migAmor(o){
  var drop={o_amor3:1,o_gym4:1,o_banho4:1,o_news4:1,o_amor4:1,amor_sat:1};
  o.tasks=(o.tasks||[]).filter(function(t){return !drop[t.id]&&(t.cat!=="amor"||t.id==="amor"||t.id==="amor_t")});
  o.tasks.forEach(function(t){
    if(t.id==="amor"){t.t="Vagas e estudos";t.cat="dev";t.note="";t.except=(t.except||[]).filter(function(x){return x!=="2026-11-04"});if(t.except.indexOf("2026-11-10")<0)t.except.push("2026-11-10")}
    if(t.id==="amor_t"){t.t="Vagas e candidaturas";t.cat="dev";t.opt=false}
    if(t.id==="banho"||t.id==="news")t.except=(t.except||[]).filter(function(x){return x!=="2026-11-04"});
  });
  var have={};o.tasks.forEach(function(t){have[t.id]=1});
  newTasks().forEach(function(t){if(!have[t.id])o.tasks.push(t)});
  delete o.cli;if(o.lists){delete o.lists.mauro;delete o.lists.gym}
  return o;
}
function load(){try{var r=localStorage.getItem(KEY);if(r){r=r.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{FE0F}\u{200D}]/gu,"");var o=JSON.parse(r);if(o&&o.v===1){if(!o.bib)o.bib=defBib();if(!o.cancel)o.cancel={};if(o.stage==null)o.stage=0;o.marco=o.marco||{};return migAmor(o)}}}catch(e){}return defaults()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
var ui={tab:"hoje",date:TODAY};

/* ---------- lógica ---------- */
function occurs(t,d){
  if(t.only)return t.only===d;
  if(t.except&&t.except.indexOf(d)>-1)return false;
  if(t.from&&d<t.from)return false;
  if(t.until&&d>t.until)return false;
  return (t.days||[]).indexOf(parse(d).getDay())>-1;
}
function dayMode(d){
  if(S.heavy[d])return "puxado";
  if(S.light&&S.light[d])return "leve";
  return S.tasks.some(function(t){return t.h==="corrida"&&occurs(t,d)})?"leve":"puxado";
}
function tasksFor(d){
  var hv=S.heavy[d];
  return S.tasks.filter(function(t){return occurs(t,d)&&!(hv&&(t.opt||t.h==="corrida"))}).sort(function(a,b){return a.s<b.s?-1:a.s>b.s?1:0});
}
function isDone(id,d){return !!(S.done[d]&&S.done[d][id])}
function isCancel(id,d){return !!(S.cancel&&S.cancel[d]&&S.cancel[d][id])}
function setDone(id,d,v){S.done[d]=S.done[d]||{};if(v)S.done[d][id]=1;else delete S.done[d][id]}
function hv(hid,d){return (S.log[d]&&S.log[d][hid])||0}
function setHv(hid,d,v){S.log[d]=S.log[d]||{};if(v>0)S.log[d][hid]=v;else delete S.log[d][hid]}
function achieved(h,d){var v=hv(h.id,d);return h.kind==="check"?v>=1:v>=h.goal}
function streak(h){
  var d=TODAY,n=0;
  if(!achieved(h,d))d=addDays(d,-1);
  while(achieved(h,d)&&n<400){n++;d=addDays(d,-1)}
  return n;
}
function monday(d){var x=parse(d),k=(x.getDay()+6)%7;x.setDate(x.getDate()-k);return iso(x)}
function weekCount(h,d){var m=monday(d),n=0;for(var i=0;i<7;i++)if(achieved(h,addDays(m,i)))n++;return n}
function nowMin(){var n=new Date();return n.getHours()*60+n.getMinutes()}
function toMin(s){var a=s.split(":");return +a[0]*60+ +a[1]}
function habitOf(id){return S.habits.filter(function(h){return h.id===id})[0]}

function pop(x,y){
  var cs=["#E07A4E","#EAAE5C","#E4799B","#6C8EE8","#45B58B","#9C7BE0"];
  for(var i=0;i<7;i++){
    var s=document.createElement("span");s.className="pop";
    s.style.cssText="left:"+(x-6)+"px;top:"+(y-6)+"px;width:12px;height:12px;border-radius:50%;background:"+cs[i%cs.length];
    s.style.setProperty("--x",((Math.random()-.5)*140)+"px");s.style.setProperty("--r","0deg");
    document.body.appendChild(s);setTimeout(function(el){return function(){el.remove()}}(s),950);
  }
}

/* ---------- views ---------- */
var QUOTES=["Um passo de cada vez, mas todos os dias. ","Sua rotina é um jeito de se cuidar. ","Feito é melhor que perfeito. ","Hoje você só precisa do próximo bloco. ","Constância bate intensidade. ","Respira, bebe água e segue. "];
function greeting(){var h=new Date().getHours();return h<12?"Bom dia":h<18?"Boa tarde":"Boa noite"}
var FOCUS={
 "2026-11-06":"Hoje: entrega do TCC.",
 "2026-11-10":"Hoje: entrevista para Product Designer (Estagiário) às 10h, pelo Teams."
};

function taskHTML(t,d){
  var done=isDone(t.id,d),canc=isCancel(t.id,d),n=nowMin(),cur=d===TODAY&&toMin(t.s)<=n&&n<toMin(t.e);
  return '<div class="task c-'+t.cat+(t.imp?' imp':'')+(t.opt?' opt':'')+(done?' done':'')+(canc?' canc':'')+(cur&&!canc?' now':'')+'">'+
   (cur&&!canc?'<span class="nowtag">agora</span>':'')+
   '<div class="tm">'+t.s+'<span>até '+t.e+'</span></div>'+
   '<div class="tb"><div class="tt">'+esc(t.t)+(t.opt?' <span class="chip">opcional</span>':'')+(t.only?' <span class="chip">só hoje</span>':'')+(canc?' <span class="chip">cancelada</span>':'')+'</div>'+(t.det?'<div class="tn">'+esc(t.det)+'</div>':'')+'</div>'+
   '<button class="mini" data-act="editTask" data-id="'+t.id+'" aria-label="Editar">Editar</button>'+
   '<button class="mini" data-act="cancelTask" data-id="'+t.id+'">'+(canc?'Restaurar':'Cancelar')+'</button>'+
   (canc?'':'<button class="ck" data-act="toggleTask" data-id="'+t.id+'" aria-label="Concluir">'+(done?'✓︎':'')+'</button>')+'</div>';
}
function ringHTML(p){
  var r=40,c=2*Math.PI*r;
  return '<svg class="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" stroke-width="12"/><circle cx="50" cy="50" r="40" fill="none" stroke="var(--coral)" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+(c*p/100)+' '+c+'" transform="rotate(-90 50 50)"/><text x="50" y="58" text-anchor="middle" font-size="24">'+p+'%</text></svg>';
}
function waterHTML(d){
  var h=habitOf("agua");if(!h)return "";
  var v=hv("agua",d),p=Math.min(100,Math.round(v/h.goal*100));
  return '<div class="card"><h2> Água de hoje</h2><div class="water"><div class="bottle"><i style="height:'+p+'%"></i><b>'+p+'%</b></div><div><div class="cnt">'+(v/1000).toFixed(2).replace(".",",")+' L</div><div class="muted">meta: '+(h.goal/1000).toString().replace(".",",")+' L</div><div class="acts"><button class="btn sm" data-act="hstep" data-id="agua" data-n="250">+250 ml</button><button class="btn sm soft" data-act="hstep" data-id="agua" data-n="500">+500 ml</button><button class="btn sm soft" data-act="hstep" data-id="agua" data-n="-250">−</button></div></div></div></div>';
}
function mapaBar(m){
  var s=m.stages||[];
  if(!s.length)return '<div class="bar" style="margin:8px 0"><i style="width:'+m.pct+'%"></i></div>';
  return '<div class="mbar2" role="img" aria-label="Progresso do mapa: '+m.pct+'%, por etapa">'+s.map(function(x,i){
    var w=x.t?Math.round(x.d/x.t*100):0;
    return '<span class="seg2" style="flex:'+x.t+';--mc:var(--m'+i+')" title="'+esc(x.n)+': '+x.d+' de '+x.t+'"><i style="width:'+w+'%"></i></span>';
  }).join("")+'</div>';
}
function mapaCard(){
  var m=window.mapaInfo?window.mapaInfo():null;if(!m)return "";
  return '<div class="card"><div class="row" style="flex-wrap:wrap"><h2>Mapa até a primeira vaga</h2><div class="sp"></div><span class="chip">'+m.pct+'%</span></div><div class="mbarwrap">'+mapaBar(m)+'</div><div class="muted">'+(m.next?'Próximo passo: '+esc(m.next):'Mapa concluído. Agora é manter o ritmo até a primeira oferta.')+'</div><div class="acts"><button class="btn sm" data-act="mapaGo" data-s="'+m.si+'">Abrir no mapa</button></div></div>';
}
function viewHoje(){
  var d=ui.date,list=tasksFor(d),act=list.filter(function(t){return !isCancel(t.id,d)}),done=act.filter(function(t){return isDone(t.id,d)}).length;
  var p=act.length?Math.round(done/act.length*100):0,x=parse(d),dm=dayMode(d);
  var v=VERSES[VI];
  var h='<div class="daycard"><div class="dl"><button class="nav" data-act="day" data-n="-1" aria-label="Dia anterior">‹</button><div><div class="dsub">'+(d===TODAY?'Hoje':'Dia selecionado')+' · '+(dm==="leve"?'dia leve':'dia puxado')+'</div><div class="d">'+DOW[x.getDay()]+', '+x.getDate()+' de '+MON[x.getMonth()]+'</div></div><button class="nav" data-act="day" data-n="1" aria-label="Próximo dia">›</button>'+(d!==TODAY?'<button class="btn sm soft" data-act="goToday">Voltar pra hoje</button>':'')+'</div><div class="vs"><div class="vq">“'+esc(v[0])+'”</div><div class="vr"><b>'+v[1]+'</b><button class="btn sm soft" data-act="verse">Outro versículo</button></div></div></div>';
  if(FOCUS[d])h+='<div class="focus">'+FOCUS[d]+'</div>';
  h+='<div class="grid two"><div><div class="tl">'+(list.length?list.map(function(t){return taskHTML(t,d)}).join(""):'<div class="card muted">Nada planejado. Que tal adicionar algo? </div>')+'</div>'+
   '<div class="acts" style="margin-top:12px"><button class="btn" data-act="newTask">＋ Nova tarefa</button></div></div>'+
   '<div class="grid">'+
   '<div class="card"><div class="ringbox">'+ringHTML(p)+'<div><div class="ringcnt"><h2>'+done+' de '+act.length+'</h2><span class="muted">blocos concluídos</span></div>'+
   '<div class="seg" role="group" aria-label="Tipo de dia"><button type="button" data-act="dayMode" data-m="leve" aria-pressed="'+(dm==="leve")+'" class="'+(dm==="leve"?"on":"")+'">Dia leve</button><button type="button" data-act="dayMode" data-m="puxado" aria-pressed="'+(dm==="puxado")+'" class="'+(dm==="puxado"?"on":"")+'">Dia puxado</button></div><div class="muted segcap">'+(dm==="leve"?"Dia leve: com corrida de 30 a 40 min":"Dia puxado: sem corrida hoje")+'</div></div></div></div>'+
   waterHabitsHTML(d)+mapaCard()+'</div></div>';
  return h;
}
function miniHabits(d){
  var hs=S.habits.filter(function(h){return h.id!=="agua"});
  return '<div class="card"><h2> Hábitos do dia</h2>'+hs.map(function(h){
    var ok=achieved(h,d);
    if(h.kind==="check")return '<div class="li '+(ok?'done':'')+'"><button class="ck" data-act="hcheck" data-id="'+h.id+'">'+(ok?'✓︎':'')+'</button><div class="lt">'+esc(h.name)+'</div></div>';
    return '<div class="li '+(ok?'done':'')+'"><button class="ck" data-act="hstep" data-id="'+h.id+'" data-n="'+h.step+'">+</button><div class="lt">'+esc(h.name)+' <span class="muted">'+hv(h.id,d)+'/'+h.goal+' '+esc(h.unit)+'</span></div></div>';
  }).join("")+'</div>';
}
function waterHabitsHTML(d){
  var all=S.habits,doneN=all.filter(function(h){return achieved(h,d)}).length;
  var w=habitOf("agua"),top="";
  if(w){
    var v=hv("agua",d),p=Math.min(100,Math.round(v/w.goal*100));
    top='<div class="water"><div class="bottle"><i style="height:'+p+'%"></i></div><div class="wtx"><div class="cnt">'+(v/1000).toFixed(2).replace(".",",")+' L</div><div class="muted">de '+(w.goal/1000).toString().replace(".",",")+' L de água</div><div class="acts"><button class="btn sm" data-act="hstep" data-id="agua" data-n="250">+250 ml</button><button class="btn sm soft" data-act="hstep" data-id="agua" data-n="500">+500 ml</button><button class="btn sm soft" data-act="hstep" data-id="agua" data-n="-250" aria-label="Tirar 250 ml">− 250 ml</button></div></div></div>';
  }
  var hs=all.filter(function(h){return h.id!=="agua"});
  var list='<div class="hlist">'+hs.map(function(h){
    var ok=achieved(h,d);
    if(h.kind==="check")return '<div class="li '+(ok?'done':'')+'"><button class="ck" data-act="hcheck" data-id="'+h.id+'">'+(ok?'✓︎':'')+'</button><div class="lt">'+esc(h.name)+'</div></div>';
    return '<div class="li '+(ok?'done':'')+'"><button class="ck" data-act="hcheck" data-id="'+h.id+'">'+(ok?'✓︎':'')+'</button><div class="lt">'+esc(h.name)+' <span class="muted">'+hv(h.id,d)+'/'+h.goal+' '+esc(h.unit)+'</span></div></div>';
  }).join("")+'</div>';
  var hn=hs.filter(function(h){return achieved(h,d)}).length;
  return '<div class="card wh-card"><div class="whbody"><section class="whh"><div class="row" style="flex-wrap:wrap"><h2>Hábitos de hoje</h2><div class="sp"></div><span class="chip">'+hn+'/'+hs.length+'</span></div>'+list+'</section><div class="hdiv"></div><section class="whw"><div class="row" style="flex-wrap:wrap"><h2>Água de hoje</h2><div class="sp"></div>'+(w?'<span class="chip">'+p+'%</span>':'')+'</div>'+top+'</section></div></div>';
}
function viewSemana(){
  var m=monday(ui.date),h='<div class="datebar"><button class="nav" data-act="day" data-n="-7">‹</button><div class="d">Semana de '+fmtDM(m)+'</div><button class="nav" data-act="day" data-n="7">›</button></div><div class="wk">';
  for(var i=0;i<7;i++){
    var d=addDays(m,i),l=tasksFor(d),la=l.filter(function(t){return !isCancel(t.id,d)}),dn=la.filter(function(t){return isDone(t.id,d)}).length,pc=la.length?Math.round(dn/la.length*100):0;
    var show=l;
    h+='<button class="wd'+(d===TODAY?' today':'')+(d===ui.date?' sel':'')+'" data-act="goDay" data-d="'+d+'"><div class="wh"><span class="wdn">'+DS[parse(d).getDay()]+'</span>'+(d===TODAY?'<span class="tg">Hoje</span>':'')+'<span class="wdd">'+parse(d).getDate()+'</span></div><div class="wbody"><div class="wbar"><i style="width:'+pc+'%"></i></div><div class="wc">'+dn+' de '+la.length+' feitos</div><ul>'+
     show.map(function(t){return '<li class="c-'+t.cat+(isDone(t.id,d)||isCancel(t.id,d)?' dn':'')+'"><i class="dt"></i><em>'+t.s+'</em><span>'+esc(t.t)+'</span></li>'}).join("")+'</ul>'+'</div></button>';
  }
  return h+'</div>';
}
function dotsHTML(h){
  var s="";for(var i=6;i>=0;i--){var d=addDays(TODAY,-i);s+='<span class="'+(achieved(h,d)?'on ':'')+(i===0?'today':'')+'">'+DS[parse(d).getDay()].charAt(0)+'</span>'}
  return '<div class="dots">'+s+'</div>';
}
function hdays(n){var a=[];for(var i=n-1;i>=0;i--)a.push(addDays(TODAY,-i));return a}
function hstats(h,ds){
  var ach=0,best=0,run=0,sum=0;
  ds.forEach(function(d){var a=achieved(h,d);if(a){ach++;run++;if(run>best)best=run}else run=0;sum+=hv(h.id,d)});
  var den=h.weekly?h.weekly*Math.ceil(ds.length/7):ds.length;
  return {ach:ach,pct:Math.min(100,Math.round(ach/den*100)),best:best,sum:sum,st:streak(h)};
}
function viewHabitos(){
  var n=ui.hp||30,ds=hdays(n),d=ui.date,x0=parse(d);
  var st=S.habits.map(function(h){return {h:h,s:hstats(h,ds)}});
  var overall=st.length?Math.round(st.reduce(function(a,o){return a+o.s.pct},0)/st.length):0;
  var base=S.habits.filter(function(h){return !h.weekly});
  var perfect=ds.filter(function(dd){return base.length&&base.every(function(h){return achieved(h,dd)})}).length;
  var bestSt=st.slice().sort(function(a,b){return b.s.st-a.s.st})[0];
  var water=habitOf("agua"),wsum=water?hstats(water,ds).sum:0;
  var logged=ds.filter(function(dd){return S.log[dd]&&Object.keys(S.log[dd]).length}).length;
  var h='<div class="row" style="flex-wrap:wrap;margin-bottom:12px"><h2 style="font-size:24px">Dashboard</h2><div class="sp"></div>'+[7,30,90].map(function(k){return '<button class="btn sm '+(n===k?'':'soft')+'" data-act="hp" data-n="'+k+'">'+k+' dias</button>'}).join("")+'</div>';
  h+='<div class="grid cards" style="margin-bottom:14px">'+
   '<div class="card"><div class="muted">Conclusão geral</div><div class="cnt">'+overall+'%</div><div class="bar" style="margin-top:8px"><i style="width:'+overall+'%"></i></div></div>'+
   '<div class="card"><div class="muted">Dias perfeitos</div><div class="cnt">'+perfect+'</div><div class="muted">todos os hábitos diários feitos</div></div>'+
   '<div class="card"><div class="muted">Maior sequência atual</div><div class="cnt">'+(bestSt?bestSt.s.st:0)+'</div><div class="muted">'+(bestSt&&bestSt.s.st?esc(bestSt.h.name):'ainda sem sequência')+'</div></div>'+
   '<div class="card"><div class="muted">Água por dia (média)</div><div class="cnt">'+(wsum/n/1000).toFixed(1).replace(".",",")+' L</div><div class="muted">'+logged+' de '+n+' dias com registro</div></div></div>';
  // grafico
  var bw=600/n,bars=ds.map(function(dd,i){
    var c=base.filter(function(x){return achieved(x,dd)}).length,pc=base.length?c/base.length:0,hh=Math.max(2,pc*110);
    return '<rect x="'+(i*bw+bw*.15)+'" y="'+(125-hh)+'" width="'+(bw*.7)+'" height="'+hh+'" rx="'+Math.min(4,bw/3)+'" fill="'+(dd===TODAY?'#C85A3B':'#E07A4E')+'" opacity="'+(pc?1:.25)+'"><title>'+fmtDM(dd)+': '+Math.round(pc*100)+'%</title></rect>';
  }).join("");
  h+='<div class="grid two"><div class="stackcol"><div class="card"><h2>Hábitos concluídos por dia</h2><svg viewBox="0 0 600 150" style="width:100%;height:auto;margin-top:8px" role="img" aria-label="Gráfico de hábitos concluídos por dia"><line x1="0" y1="125" x2="600" y2="125" stroke="var(--line)"/>'+bars+'<text x="0" y="145" font-size="11" fill="var(--soft)">'+fmtDM(ds[0])+'</text><text x="600" y="145" font-size="11" text-anchor="end" fill="var(--soft)">'+fmtDM(ds[n-1])+'</text></svg></div>';
  h+='<div class="card"><h2>Mapa dos registros</h2><p class="muted" style="margin:4px 0 10px">Toque em um dia para abrir e editar os registros dele.</p><div class="heatwrap"><div class="heat" style="grid-template-columns:150px repeat('+n+',minmax('+(n>40?9:16)+'px,1fr))">'+
   st.map(function(o){return '<div class="hl">'+esc(o.h.name)+'</div>'+ds.map(function(dd){
     var f=o.h.kind==="check"?(hv(o.h.id,dd)>=1?1:0):Math.min(1,hv(o.h.id,dd)/o.h.goal);
     return '<button class="hc'+(dd===d?' sel':'')+'" data-act="hDay" data-d="'+dd+'" title="'+fmtDM(dd)+'" style="background:'+(f>=1?'var(--coral)':f>0?'rgba(224,122,78,'+(0.25+f*.4)+')':'var(--line)')+'"></button>';
   }).join("")}).join("")+'</div></div></div>';
  h+='</div>';
  h+='<div class="card"><h2>Por hábito</h2>'+st.map(function(o){
    var x=o.h;return '<div class="li"><div class="tb"><div class="row"><b>'+esc(x.name)+'</b><div class="sp"></div><span class="muted">'+o.s.pct+'%</span></div><div class="bar" style="margin:6px 0"><i style="width:'+o.s.pct+'%"></i></div><div class="tn">'+o.s.ach+' dias feitos · sequência atual '+o.s.st+' · melhor '+o.s.best+(x.kind==="count"?' · total '+o.s.sum+' '+esc(x.unit):'')+'</div></div></div>';
  }).join("")+'</div></div>';
  // mapa de calor

  // dia
  h+='<div class="datebar" style="margin-top:22px"><div class="d">Registros do dia</div><button class="nav" data-act="day" data-n="-1" aria-label="Dia anterior">‹</button><div class="d" style="font-size:18px">'+DOW[x0.getDay()]+', '+x0.getDate()+' de '+MON[x0.getMonth()]+'</div><button class="nav" data-act="day" data-n="1" aria-label="Próximo dia">›</button><input id="hdate" type="date" value="'+d+'" style="padding:8px 10px;border-radius:12px;border:1.5px solid var(--line);background:var(--card)">'+(d!==TODAY?'<button class="btn sm soft" data-act="goToday">Voltar pra hoje</button>':'')+'</div><div class="grid cards">';
  S.habits.forEach(function(x){
    var v=hv(x.id,d),ok=achieved(x,d),sk=streak(x);
    h+='<div class="card hab"><div class="hd"><div class="dotc"></div><div><h3>'+esc(x.name)+'</h3><div class="muted">'+(x.weekly?weekCount(x,d)+' de '+x.weekly+' na semana':sk+' dia'+(sk===1?'':'s')+' seguidos')+'</div></div><div class="sp"></div><button class="mini" data-act="editHabit" data-id="'+x.id+'">Editar</button></div>';
    if(x.kind==="check")h+='<button class="big '+(ok?'on':'')+'" data-act="hcheck" data-id="'+x.id+'">'+(ok?'Feito ✓︎':'Marcar como feito')+'</button>';
    else h+='<div class="bar"><i style="width:'+Math.min(100,v/x.goal*100)+'%"></i></div><div class="row"><b>'+v+' / '+x.goal+' '+esc(x.unit)+'</b><div class="sp"></div><button class="btn sm soft" data-act="hstep" data-id="'+x.id+'" data-n="'+(-x.step)+'">−</button><button class="btn sm" data-act="hstep" data-id="'+x.id+'" data-n="'+x.step+'">+'+x.step+'</button></div>';
    h+=dotsHTML(x)+'</div>';
  });
  return h+'</div><div class="acts" style="margin-top:12px"><button class="btn" data-act="newHabit">＋ Novo hábito</button></div>';
}
var ST=["A fazer","Em produção","Aprovado","Postado "];
function cliById(id){return S.cli.list.filter(function(c){return c.id===id})[0]}
function dueChip(tk){
  if(!tk.due)return '';
  var late=!tk.done&&tk.due<TODAY;
  return '<span class="due'+(late?' late':'')+'">'+DS[parse(tk.due).getDay()]+' '+fmtDM(tk.due)+'</span>';
}
function cTaskRow(tk,showCli){
  var c=cliById(tk.c)||{n:"",c:"#E07A4E"};
  return '<div class="li '+(tk.done?'done':'')+'" style="--cc:'+c.c+'"><button class="ck" data-act="cTaskToggle" data-id="'+tk.id+'">'+(tk.done?'✓︎':'')+'</button><div class="lt tb">'+esc(tk.t)+'</div>'+(showCli?'<span class="tag">'+esc(c.n)+'</span>':'')+dueChip(tk)+'<button class="mini" data-act="cTaskEdit" data-id="'+tk.id+'">Editar</button></div>';
}
function viewAmor(){
  var C=S.cli,sel=C.sel,G=S.lists.gym,M=S.lists.mauro;
  var pend=function(id){return C.tasks.filter(function(x){return x.c===id&&!x.done}).length};
  var h='<div class="chips bsubm"><button class="cchip" aria-pressed="'+(sel==="all")+'" data-act="cliSel" data-id="all"><i></i>Todos <b>'+C.tasks.filter(function(x){return !x.done}).length+'</b></button>'+
   C.list.map(function(c){return '<button class="cchip" style="--cc:'+c.c+'" aria-pressed="'+(sel===c.id)+'" data-act="cliSel" data-id="'+c.id+'"><i></i>'+esc(c.n)+' <b>'+pend(c.id)+'</b></button>'}).join("")+
   '<button class="btn ghost sm" data-act="cliAdd">＋ Cliente</button></div>';
  if(sel==="all"||!cliById(sel)){
    h+='<div class="grid cards">'+C.list.map(function(c){
      var all=C.tasks.filter(function(x){return x.c===c.id}),dn=all.filter(function(x){return x.done}).length,nx=all.filter(function(x){return !x.done&&x.due}).sort(function(a,b){return a.due<b.due?-1:1})[0];
      return '<button class="card ccard" style="--cc:'+c.c+'" data-act="cliSel" data-id="'+c.id+'"><h2>'+esc(c.n)+'</h2><div class="muted">'+dn+' de '+all.length+' tarefas feitas</div><div class="bar" style="margin:10px 0 8px"><i style="width:'+(all.length?dn/all.length*100:0)+'%;background:'+c.c+'"></i></div><div class="muted">'+(nx?'Próxima entrega: '+DS[parse(nx.due).getDay()]+' '+fmtDM(nx.due):'Sem prazo marcado')+'</div></button>';
    }).join("")+'</div>';
    var up=C.tasks.filter(function(x){return !x.done}).sort(function(a,b){return (a.due||"9")<(b.due||"9")?-1:1});
    h+='<div class="card" style="margin-top:14px"><h2>Próximas tarefas</h2>'+(up.length?up.map(function(x){return cTaskRow(x,true)}).join(""):'<p class="muted">Tudo em dia.</p>')+'<div class="acts"><button class="btn ghost" data-act="cTaskAdd">＋ Nova tarefa</button></div></div>';
    return h;
  }
  var c=cliById(sel),mine=C.tasks.filter(function(x){return x.c===sel}).sort(function(a,b){return a.done-b.done||((a.due||"9")<(b.due||"9")?-1:1)});
  var extra=sel==="mauro"||sel==="gym";
  h+='<div class="grid '+(extra?'two':'')+'" style="--cc:'+c.c+'"><div class="card" style="border-top:6px solid '+c.c+'"><div class="row"><h2>'+esc(c.n)+'</h2><div class="sp"></div><button class="mini" data-act="cliEdit" data-id="'+c.id+'">Editar cliente</button></div><div class="muted" style="margin-bottom:6px">'+mine.filter(function(x){return x.done}).length+' de '+mine.length+' tarefas feitas</div>'+
   (mine.length?mine.map(function(x){return cTaskRow(x,false)}).join(""):'<p class="muted">Nenhuma tarefa ainda.</p>')+'<div class="acts"><button class="btn ghost" data-act="cTaskAdd">＋ Nova tarefa</button></div></div>';
  if(sel==="mauro"){
    var pm=M.filter(function(i){return i.st===3}).length;
    h+='<div class="card"><h2>Conteúdos de novembro</h2><p class="muted" style="margin:4px 0 8px">2 por semana, quarta e sexta. '+pm+' de '+M.length+' postados.</p>';
    M.forEach(function(i){var x=parse(i.d);h+='<div class="li"><div class="tb"><div class="lt"><b>'+DS[x.getDay()]+' '+fmtDM(i.d)+'</b> · '+esc(i.f)+'</div><div class="tn">'+esc(i.t)+'</div></div><button class="stbtn st'+i.st+'" data-act="mStatus" data-id="'+i.id+'">'+ST[i.st]+'</button><button class="mini" data-act="mEdit" data-id="'+i.id+'">Editar</button></div>'});
    h+='<div class="acts"><button class="btn ghost" data-act="mAdd">＋ Novo conteúdo</button></div></div>';
  }
  if(sel==="gym"){
    var gd=G.filter(function(i){return i.done}).length,last="";
    h+='<div class="card"><h2>Takes de quarta, 8h</h2><p class="muted" style="margin:4px 0 6px">'+gd+' de '+G.length+' itens prontos</p>';
    G.forEach(function(i){if(i.g!==last){h+='<div class="grp">'+esc(i.g)+'</div>';last=i.g}h+='<div class="li '+(i.done?'done':'')+'"><button class="ck" data-act="listToggle" data-l="gym" data-id="'+i.id+'">'+(i.done?'✓︎':'')+'</button><div class="lt tb">'+esc(i.t)+'</div><button class="mini" data-act="listDel" data-l="gym" data-id="'+i.id+'">×</button></div>'});
    h+='<div class="acts"><button class="btn ghost" data-act="listAdd" data-l="gym">＋ Adicionar item</button></div></div>';
  }
  return h+'</div>';
}
var DEVB=[["ing","","Inglês","20","Documentação, vídeo sem legenda ou pitch em voz alta"],["novo","","Estudo novo","60","O tema da semana da etapa atual"],["pratica","","Prática","30","Escrever código no projeto ou resolver exercícios"],["cand","","Candidaturas","30","Enviar, atualizar a planilha e mandar mensagens"]];
function viewDev(){
  var d=ui.date,sc=S.devScale,tot=0,dn=0,cur=S.stage,sg=STG[cur];
  var h='<div class="card" style="margin-bottom:14px"><div class="row" style="flex-wrap:wrap"><div><div class="muted">Você está na</div><h2 style="font-size:26px">Etapa '+cur+' · '+sg[0]+'</h2><div class="muted">'+sg[1]+' · '+sg[2]+'</div></div><div class="sp"></div><div class="acts" style="margin:0"><button class="btn sm '+(S.marco[cur]?'':'soft')+'" data-act="marco">'+(S.marco[cur]?'Marco concluído ✓︎':'Marcar o marco como concluído')+'</button>'+(cur<5?'<button class="btn sm" data-act="stage" data-n="'+(cur+1)+'">Avançar para a próxima</button>':'')+'</div></div><div class="muted" style="margin:8px 0 12px">Marco da etapa: <b>'+sg[3]+'</b></div><div class="bar" style="margin-bottom:12px"><i style="width:'+Math.round((cur+(S.marco[cur]?1:0))/6*100)+'%"></i></div><div class="steps">'+
   STG.map(function(s,i){return '<button class="stp '+(i<cur?'past':i===cur?'now':'')+'" data-act="stage" data-n="'+i+'"><b>'+(i<cur?'✓︎':i)+'</b><span>'+s[0]+'</span><small>'+s[1]+'</small></button>'}).join("")+'</div></div>';
  h+='<div class="grid two"><div class="card"><h2>Estudos de '+fmtDM(d)+'</h2><div class="acts" style="margin:8px 0"><button class="btn sm '+(sc===1?'':'soft')+'" data-act="scale" data-n="1">100%</button><button class="btn sm '+(sc===.5?'':'soft')+'" data-act="scale" data-n=".5">50%</button></div>';
  DEVB.forEach(function(b){
    var m=Math.round(+b[3]*sc),ok=S.dev[d]&&S.dev[d][b[0]];tot+=m;if(ok)dn+=m;
    h+='<div class="li '+(ok?'done':'')+'"><button class="ck" data-act="devBlock" data-id="'+b[0]+'">'+(ok?'✓︎':'')+'</button><div class="tb"><div class="lt"><b>'+b[2]+'</b> · '+m+' min</div></div></div>';
  });
  h+='<div class="bar" style="margin-top:10px"><i style="width:'+(tot?dn/tot*100:0)+'%"></i></div><div class="muted" style="margin-top:4px">'+dn+' de '+tot+' min</div></div>'+
   ''+mapaCard()+'</div>';
  return h;
}
/* ---------- BÍBLIA ---------- */
var PHN=["Orientação","Origens","Êxodo e Lei","Conquista","Monarquia unida","Reino dividido","Exílio","Retorno","Entre os Testamentos","Cristo","Igreja primitiva","Conclusão"];
var PHB=[
["Marcos","João"],
["Gênesis","Jó"],
["Êxodo","Levítico","Números","Deuteronômio"],
["Josué","Juízes","Rute"],
["1 Samuel","2 Samuel","1 Crônicas","1 Reis 1–11","Salmos","Provérbios","Eclesiastes","Cantares"],
["1 Reis 12–22","2 Reis","2 Crônicas","Amós","Oseias","Jonas","Miquéias","Isaías 1–39","Joel","Obadias","Naum","Habacuque","Sofonias","Jeremias"],
["Lamentações","Ezequiel","Daniel","Isaías 40–66"],
["Esdras","Neemias","Ester","Ageu","Zacarias","Malaquias"],
["Resumo histórico do período","Daniel 8 e 11 (releitura)","1 Macabeus","Flávio Josefo, Guerra dos Judeus, livro 1"],
["Mateus","Lucas","Marcos (releitura)","João (releitura)"],
["Atos","Tiago","Gálatas","1 Tessalonicenses","2 Tessalonicenses","1 Coríntios","2 Coríntios","Romanos","Efésios","Filipenses","Colossenses","Filemom","1 Timóteo","Tito","2 Timóteo"],
["Hebreus","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"]];
var BST=["Não iniciado","Lendo","Concluído"];
var PHO={"8-2":1,"8-3":1};
var PHD={8:{obj:"Entender o que aconteceu entre Malaquias (~430 a.C.) e Jesus (~5 a.C.), para ler os Evangelhos já conhecendo o mundo em que eles se passam.",
 ess:[["Resumo histórico do período","Pode ser o capítulo de contexto histórico de uma Bíblia de estudo ou de uma introdução ao Novo Testamento. Anote só: os cinco períodos (persa, grego, perseguição de Antíoco, macabeus, romano) e os grupos (fariseus, saduceus, essênios, zelotes)."],["Daniel 8 e 11, relidos com esse mapa","Você já terá lido Daniel na Fase 6."]],
 opt:[["1 Macabeus","A principal narrativa do período (cânon católico, aqui como documento histórico)."],["Flávio Josefo, Guerra dos Judeus, livro 1",""]],
 reg:[["Contexto","o período em uma frase."],["Observação","quem governava, o que mudou (língua, sinagogas, grupos religiosos), eventos principais."],["Interpretação","o que esse tempo mostra sobre Deus."],["Conexões","Malaquias, Daniel e personagens de Marcos."],["Aplicação","uma verdade para crer e uma atitude para praticar."]],
 crit:"Considere a fase concluída quando conseguir explicar, em poucas frases, por que existem fariseus, herodianos e cobradores de impostos nos Evangelhos e como o mundo mudou desde Malaquias.",
 nota:"Os livros indicados são sugestões a conferir na hora."}};
function bGuia(i){
  var g=PHD[i];if(!g)return "";
  var it=function(l){return l.map(function(x){return '<div class="gi"><b>'+esc(x[0])+'</b>'+(x[1]?'<span>'+esc(x[1])+'</span>':'')+'</div>'}).join("")};
  return '<div class="guia"><div class="gs" style="--gc:#E07A4E"><div class="gl">Objetivo</div><span>'+esc(g.obj)+'</span></div>'+
   '<div class="gs" style="--gc:#45B58B"><div class="gl">Leitura essencial</div>'+it(g.ess)+'</div>'+
   '<div class="gs" style="--gc:#9C7BE0"><div class="gl">Leitura opcional (aprofundamento)</div>'+it(g.opt)+'</div>'+
   '<div class="gs" style="--gc:#6C8EE8"><div class="gl">O que registrar (um único registro de sessão)</div>'+it(g.reg)+'</div>'+
   '<div class="gs" style="--gc:#E4799B"><div class="gl">Critério de conclusão</div><span>'+esc(g.crit)+'</span></div>'+
   '<div class="muted">'+esc(g.nota)+'</div></div>';
}
var METODO=["Oração inicial","Contexto (autor, público, época, cenário)","Leitura (duas vezes)","Observação","Interpretação","Conexões","Aplicação","Registro"];
var PRINC=["Ler a Bíblia inteira, com a maior riqueza possível de detalhes, conexões e aprendizado.","O foco é a evolução espiritual, fazendo ligações históricas e acompanhando o próprio crescimento.","Sem prazo definido: o avanço é por compreensão, não por quantidade.","A leitura segue a ordem histórico-cronológica, em 12 fases."];
var CHQ=["Qual foi a ideia central desta fase?","O que aprendi sobre o caráter de Deus?","Quais conexões foram mais surpreendentes?","O que mudou em mim (pensamentos, atitudes, decisões)?","Que perguntas levo para a próxima fase?"];
var RTQ=["Reli meus registros. Quais perguntas se repetiram?","Que perguntas antigas já foram respondidas e como?","Como minha compreensão de Deus mudou neste período?","Que atitudes e hábitos mudaram em mim?","O que quero ajustar no método ou no ritmo?"];
var RTA=["Compreensão do texto","Conexões entre os livros","Constância no estudo","Vida de oração","Aplicação prática"];
var FIOS0=[["f1","Aliança","Noé, Abraão, Moisés, Davi, Nova Aliança"],["f2","Sacrifício e cordeiro",""],["f3","Reino de Deus",""],["f4","Templo e presença de Deus",""],["f5","Promessa do Messias",""],["f6","Remanescente",""],["f7","Sabedoria e justiça",""]];
var TLR=[["abraao","Abraão","c. 2000 a.C.","Gênesis"],["exodo","Êxodo e Lei","","Êxodo a Deuteronômio"],["conq","Conquista e Juízes","","Josué, Juízes"],["monar","Saul, Davi, Salomão","","Samuel, Reis, Salmos"],["div","Reino dividido","931 a.C.","Reis, Crônicas, profetas"],["sam","Queda de Samaria","722 a.C.","2 Reis"],["jer","Queda de Jerusalém","586 a.C.","Jeremias, Lamentações"],["ret","Retorno do exílio","538 a.C.","Esdras, Neemias"],["entre","Entre os Testamentos","","Estudo histórico"],["jesus","Vida de Jesus","","Evangelhos"],["igreja","Igreja primitiva e Paulo","","Atos e cartas"]];
var EMP={"Egito":"#E8C531","Assíria":"#E07A4E","Babilônia":"#6C8EE8","Pérsia":"#9C7BE0","Grécia":"#45B58B","Roma":"#E4799B"};
function defBib(){return {cover:{obj:"Ler a Bíblia inteira, com a maior riqueza possível de detalhes, conexões e aprendizado.",ini:"2026-10-29",rec:"",hora:"",freq:""},books:{"0-0":{st:1,date:"",note:"Marcos 1",ini:"2026-10-29"}},sessions:[],fios:FIOS0.map(function(f){return {id:f[0],n:f[1],hint:f[2]}}),threads:{},ot:[],tl:{},check:{},retros:[],week:{}};}
function setPath(o,p,v){for(var i=0;i<p.length-1;i++){if(typeof o[p[i]]!=="object"||o[p[i]]===null)o[p[i]]={};o=o[p[i]]}o[p[p.length-1]]=v}
function bphase(i){var bk=PHB[i],dn=0,rd=0,n=0,od=0;bk.forEach(function(b,j){var k=i+"-"+j,o=S.bib.books[k];if(PHO[k]){if(o&&o.st===2)od++;return}n++;if(o&&o.st===2)dn++;else if(o&&o.st===1)rd++});return {dn:dn,rd:rd,n:n,od:od}}
function bcur(){for(var i=0;i<12;i++){var p=bphase(i);if(p.dn<p.n)return i}return 11}
function fmtFull(s){return s?fmtDM(s)+"/"+parse(s).getFullYear():""}
var BSUBS=[["visao","Visão geral"],["livros","Livros"],["sessoes","Sessões"],["evol","Evolução"]];
function bsubnav(){var T=BSUBS;return '<div class="chips bsubm">'+T.map(function(t){return '<button class="cchip" aria-pressed="'+((ui.bsub||"visao")===t[0])+'" data-act="bsub" data-id="'+t[0]+'">'+t[1]+'</button>'}).join("")+'</div>'}
function viewBiblia(){var f={visao:bVisao,livros:bLivros,sessoes:bSessoes,evol:bEvol}[ui.bsub||"visao"]||bVisao;return bsubnav()+f()}
function bVisao(){
  var B=S.bib,tot=0,dn=0,reading=[];
  PHB.forEach(function(a,i){var p=bphase(i);tot+=p.n;dn+=p.dn;a.forEach(function(n,j){var o=B.books[i+"-"+j];if(o&&o.st===1)reading.push(n+(o.note&&o.note!==n?" ("+o.note+")":""))})});
  var cp=bcur(),m=monday(ui.bwk||TODAY),wk=0,days="";
  for(var k=0;k<7;k++){var d=addDays(m,k),on=!!B.week[d];if(on)wk++;days+='<button class="bday'+(on?' on':'')+(d===TODAY?' today':'')+'" data-act="bwday" data-d="'+d+'"><span>'+DS[parse(d).getDay()]+'</span><b>'+parse(d).getDate()+'</b></button>'}
  var h='<div class="kpis"><div class="card"><div class="muted">Livros concluídos</div><div class="cnt">'+dn+' <small>de '+tot+'</small></div><div class="bar" style="margin-top:8px"><i style="width:'+Math.round(dn/tot*100)+'%"></i></div></div>'+
   '<div class="card"><div class="muted">Fase atual</div><div class="cnt">'+cp+'</div><div class="muted">'+PHN[cp]+'</div></div>'+
   '<div class="card"><div class="muted">Lendo agora</div><div class="cnt" style="font-size:24px;line-height:1.2">'+(reading.length?esc(reading.join(", ")):'Nada em andamento')+'</div></div>'+
   '<div class="card"><div class="muted">Sessões registradas</div><div class="cnt">'+B.sessions.length+'</div><div class="muted">início em '+fmtFull(B.cover.ini)+'</div></div></div>';
  var rows=[["Início",fmtFull(B.cover.ini),"var(--fe)",""],["Sessões por semana",B.cover.freq,"var(--amor)","big"],["Bíblia de estudo",B.cover.rec,"var(--tcc)",""],["Horário e lugar",B.cover.hora,"var(--dev)",""]].filter(function(r){return r[1]});
  h+='<div class="grid3"><div class="card fillcard"><h2>Objetivo e princípios</h2><div class="steplist">'+PRINC.map(function(x,i){return '<div class="stepi"><span class="sn" style="--sc:'+['#E07A4E','#E4799B','#6C8EE8','#45B58B'][i%4]+'">'+(i+1)+'</span><span>'+x+'</span></div>'}).join("")+'</div></div>'+
   '<div class="card fillcard"><h2>Método de cada sessão</h2><div class="steplist">'+METODO.map(function(x,i){return '<div class="stepi"><span class="sn" style="--sc:'+['#E07A4E','#EAAE5C','#E4799B','#6C8EE8','#9C7BE0','#45B58B','#9BC24A','#C85A3B'][i%8]+'">'+(i+1)+'</span><span>'+x+'</span></div>'}).join("")+'</div></div>'+
   '<div class="stackcol"><div class="card"><div class="row"><h2>Esta semana</h2><div class="sp"></div><button class="nav" data-act="bwk" data-n="-7">‹</button><button class="nav" data-act="bwk" data-n="7">›</button></div><div class="muted" style="margin:4px 0 10px">'+wk+' de 7 dias estudados · semana de '+fmtDM(m)+'</div><div class="bdays">'+days+'</div></div>'+
   '<div class="card"><h2>Capa do estudo</h2><div class="goal"><small>Objetivo</small>'+esc(B.cover.obj)+'</div><div class="tiles">'+rows.map(function(r){return '<div class="tile" style="background:'+r[2]+'"><small>'+r[0]+'</small><b class="'+r[3]+'">'+esc(r[1])+'</b></div>'}).join("")+'</div></div></div></div>';
  h+='<div class="card" style="margin-top:14px"><h2>Mapa das fases</h2><div class="phmap">'+PHN.map(function(n,i){var p=bphase(i),pc=Math.round(p.dn/p.n*100);return '<button class="phc'+(i===cp?' now':'')+(p.dn===p.n?' ok':'')+'" data-act="bsub" data-id="livros"><b>'+i+'</b><span>'+n+'</span><div class="bar"><i style="width:'+pc+'%"></i></div><small>'+p.dn+' de '+p.n+'</small></button>'}).join("")+'</div></div>';
  return h;
}
function bLivros(){
  var cp=bcur(),h='<div class="grid cards">';
  PHB.forEach(function(bk,i){
    var p=bphase(i);
    var gopen=!!(ui.bguia&&ui.bguia[i]),opN=bk.length-p.n;
    h+='<div class="card'+(i===cp?' curph':'')+(gopen?' span2':'')+'"><div class="row"><h2 style="font-size:18px">Fase '+i+' · '+PHN[i]+'</h2><div class="sp"></div>'+(PHD[i]?'<button class="btn sm '+(gopen?'':'soft')+'" data-act="bguia" data-id="'+i+'">'+(gopen?'Fechar guia':'Guia da fase')+'</button>':'')+'</div><div class="muted">'+p.dn+' de '+p.n+' concluídos'+(opN?' · opcionais '+p.od+' de '+opN:'')+(i===cp?' · fase atual':'')+'</div><div class="bar" style="margin:8px 0"><i style="width:'+Math.round(p.dn/p.n*100)+'%"></i></div>';
    bk.forEach(function(n,j){
      var k=i+"-"+j,o=S.bib.books[k]||{st:0};
      h+='<div class="bk"><span class="bn">'+esc(n)+(PHO[k]?' <span class="chip">opcional</span>':'')+(o.note&&o.st===1?' <small>'+esc(o.note)+'</small>':'')+'</span><button class="bst s'+o.st+'" data-act="bbook" data-id="'+k+'">'+BST[o.st]+'</button>'+(o.st===2?'<input class="bdt" type="date" data-bf="books.'+k+'.date" value="'+(o.date||"")+'">':'')+'</div>';
    });
    if(gopen)h+=bGuia(i);
    h+='</div>';
  });
  return h+'</div>';
}
function bPassosCard(){return '<div class="card fillcard"><h2>Os 8 passos</h2><div class="steplist">'+METODO.map(function(x,i){return '<div class="stepi"><span class="sn" style="--sc:'+['#E07A4E','#EAAE5C','#E4799B','#6C8EE8','#9C7BE0','#45B58B','#9BC24A','#C85A3B'][i%8]+'">'+(i+1)+'</span><span>'+x+'</span></div>'}).join("")+'</div></div>'}
function bookName(k){var a=k.split("-");return PHB[+a[0]][+a[1]]}
function sbook(s){
  if(s.book)return s.book;
  var ps=(s.pass||"").toLowerCase(),best=null,bl=0;
  PHB.forEach(function(bk,i){bk.forEach(function(n,j){var nn=n.toLowerCase().replace(" (releitura)","").replace(/ [0-9]+–[0-9]+$/,"");if(ps.indexOf(nn)===0&&nn.length>bl){best=i+"-"+j;bl=nn.length}})});
  return best;
}
function bdefBook(){
  var cp=bcur(),k=null;
  PHB.forEach(function(bk,i){bk.forEach(function(n,j){var o=S.bib.books[i+"-"+j];if(!k&&o&&o.st===1)k=i+"-"+j})});
  if(k)return k;
  for(var j=0;j<PHB[cp].length;j++){var o=S.bib.books[cp+"-"+j];if(!o||o.st!==2)return cp+"-"+j}
  return cp+"-0";
}
function bSessoes(){
  ui.bcol=ui.bcol||{};
  var L=S.bib.sessions,groups={},cnt={};
  L.forEach(function(s){var k=sbook(s)||"none";(groups[k]=groups[k]||[]).push(s);var ph=k==="none"?-1:+k.split("-")[0];cnt[ph]=(cnt[ph]||0)+1});
  var f=ui.bsf==null?"all":ui.bsf;
  var keys=Object.keys(groups).sort(function(a,b){var x=a==="none"?[99,0]:a.split("-").map(Number),y=b==="none"?[99,0]:b.split("-").map(Number);return x[0]-y[0]||x[1]-y[1]});
  var h='<div class="grid two"><div class="card"><div class="row"><h2>Sessões de estudo</h2><div class="sp"></div><button class="btn" data-act="bsessNew">Nova sessão</button></div>';
  if(!L.length)return h+'<p class="muted" style="margin-top:10px">Nenhuma sessão registrada ainda. Toque em Nova sessão para começar.</p></div>'+bPassosCard()+'</div>';
  h+='<div class="chips" style="margin:12px 0"><button class="cchip" aria-pressed="'+(f==="all")+'" data-act="bsf" data-id="all">Todas <b>'+L.length+'</b></button>'+Object.keys(cnt).map(Number).sort(function(a,b){return (a<0?99:a)-(b<0?99:b)}).map(function(ph){return '<button class="cchip" aria-pressed="'+(f===ph)+'" data-act="bsf" data-id="'+ph+'">'+(ph<0?'Sem livro':'Fase '+ph+' · '+PHN[ph])+' <b>'+cnt[ph]+'</b></button>'}).join("")+'</div>';
  var lastPh=null;
  keys.forEach(function(k){
    var ph=k==="none"?-1:+k.split("-")[0];
    if(f!=="all"&&f!==ph)return;
    if(ph!==lastPh){h+='<div class="grp">'+(ph<0?'Sem livro definido':'Fase '+ph+' · '+PHN[ph])+'</div>';lastPh=ph}
    var bo=k==="none"?null:S.bib.books[k],st=bo?bo.st:0,col=!!ui.bcol[k];
    var items=groups[k].slice().sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:0});
    h+='<div class="bgrp"><button class="bgh" data-act="bcol" data-id="'+k+'"><span class="bgn">'+(k==="none"?'Sem livro':esc(bookName(k)))+'</span>'+(k!=="none"?'<span class="bst s'+st+'">'+BST[st]+'</span>':'')+'<span class="chip">'+items.length+(items.length===1?' sessão':' sessões')+'</span><span class="bcar">'+(col?'Mostrar':'Ocultar')+'</span></button>';
    if(!col)h+=items.map(function(s){return '<div class="li"><div class="tb"><div class="lt"><b>'+fmtFull(s.date)+'</b> · '+esc(s.pass||"sem passagem")+'</div><div class="tn">'+(s.perg?'Pergunta: '+esc(s.perg):'Sem pergunta registrada')+'</div></div><span class="chip">'+s.n+' de 8 passos</span><button class="mini" data-act="bsessEdit" data-id="'+s.id+'">Abrir</button></div>'}).join("");
    h+='</div>';
  });
  return h+'</div>'+bPassosCard()+'</div>';
}
function sessForm(id){
  var s=id?S.bib.sessions.filter(function(x){return x.id===id})[0]:null;s=s||{};
  var fld=function(i,l,k,rows){return '<label class="fld">'+l+'<textarea class="autoh" id="'+i+'" rows="'+(rows||2)+'">'+esc(s[k]||"")+'</textarea></label>'};
  openModal('<h2>'+(id?'Sessão de estudo':'Nova sessão de estudo')+'</h2>'+
   '<div class="fr"><label class="fld">Data<input id="s_date" type="date" value="'+(s.date||TODAY)+'"></label><label class="fld">Livro<select id="s_book">'+PHB.map(function(bk,i){return '<optgroup label="Fase '+i+' · '+PHN[i]+'">'+bk.map(function(n,j){var kk=i+"-"+j;return '<option value="'+kk+'"'+(kk===(sbook(s)||bdefBook())?' selected':'')+'>'+esc(n)+'</option>'}).join("")+'</optgroup>'}).join("")+'</select></label></div>'+
   '<label class="fld">Passagem<input id="s_pass" value="'+esc(s.pass||"")+'" placeholder="Ex.: Marcos 1-3"></label>'+
   '<label class="ckl"><input id="s_ora" type="checkbox"'+(s.ora?' checked':'')+'> 1. Oração inicial feita</label>'+
   fld('s_ctx','2. Contexto em uma frase (quem, para quem, quando, onde)','ctx')+
   '<div class="ckl2"><span>3. Leitura</span><label class="ckl"><input id="s_r1" type="checkbox"'+(s.r1?' checked':'')+'> 1ª vez</label><label class="ckl"><input id="s_r2" type="checkbox"'+(s.r2?' checked':'')+'> 2ª vez</label></div>'+
   fld('s_obs','4. Observação: o que o texto diz (personagens, repetições, promessas, ordens)','obs',3)+
   fld('s_int','5. Interpretação: o que revela sobre Deus','int',3)+
   fld('s_con','6. Conexões (referências cruzadas, tema, evento histórico)','con')+
   fld('s_perg','Uma pergunta que ficou','perg',1)+
   fld('s_verd','7. Aplicação: uma verdade para crer','verd',1)+fld('s_atit','Uma atitude para praticar','atit',1)+
   fld('s_resp','Oração em resposta','resp')+
   '<div class="acts"><button class="btn" data-act="bsessSave" data-id="'+(id||"")+'">8. Salvar registro</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(id?'<button class="btn danger" data-act="bsessDel" data-id="'+id+'">Apagar</button>':'')+'</div>','wide');
}
function bFios(){
  var B=S.bib,sel=ui.bfio||B.fios[0].id,isOt=sel==="ot",f=B.fios.filter(function(x){return x.id===sel})[0];
  var h='<div class="chips">'+B.fios.map(function(x){return '<button class="cchip" aria-pressed="'+(sel===x.id)+'" data-act="bfio" data-id="'+x.id+'">'+esc(x.n)+' <b>'+((B.threads[x.id]||[]).length)+'</b></button>'}).join("")+'<button class="cchip" aria-pressed="'+isOt+'" data-act="bfio" data-id="ot">Antigo no Novo <b>'+B.ot.length+'</b></button><button class="btn ghost sm" data-act="bfioNew">＋ Novo fio</button></div>';
  var L=isOt?B.ot:(B.threads[sel]||[]);
  h+='<div class="card"><div class="row"><div><h2>'+(isOt?'Antigo no Novo':esc(f?f.n:""))+'</h2><div class="muted">'+(isOt?'Como o Antigo Testamento aparece no Novo: dois textos lado a lado.':esc(f&&f.hint?f.hint:'Anote as referências conforme encontra.'))+'</div></div><div class="sp"></div>'+(!isOt&&f?'<button class="mini" data-act="bfioEditFio" data-id="'+f.id+'">Editar fio</button>':'')+'<button class="btn" data-act="bentNew">Nova anotação</button></div>';
  if(!L.length)h+='<p class="muted" style="margin-top:12px">Nenhuma anotação ainda.</p>';
  else if(isOt)h+='<div class="ents">'+L.map(function(e){return '<div class="ent"><div><small>Antigo Testamento</small><b>'+esc(e.a)+'</b></div><div><small>Novo Testamento</small><b>'+esc(e.n)+'</b></div><div><small>O que a ligação revela</small>'+esc(e.r)+'</div><button class="mini" data-act="bentEdit" data-id="'+e.id+'">Editar</button></div>'}).join("")+'</div>';
  else h+='<div class="ents">'+L.map(function(e){return '<div class="ent"><div><small>Referência</small><b>'+esc(e.ref)+'</b></div><div><small>O que diz sobre o tema</small>'+esc(e.txt)+'</div><div><small>Fase / época</small>'+esc(e.ep)+'</div><div><small>Liga com</small>'+esc(e.liga)+'</div><button class="mini" data-act="bentEdit" data-id="'+e.id+'">Editar</button></div>'}).join("")+'</div>';
  return h+'</div>';
}
function entForm(id){
  var sel=ui.bfio||S.bib.fios[0].id,isOt=sel==="ot",L=isOt?S.bib.ot:(S.bib.threads[sel]||[]),e=id?L.filter(function(x){return x.id===id})[0]:null;e=e||{};
  var inp=function(i,l,k){return '<label class="fld">'+l+'<input id="'+i+'" value="'+esc(e[k]||"")+'"></label>'};
  var ta=function(i,l,k,r){return '<label class="fld">'+l+'<textarea class="autoh" id="'+i+'" rows="'+(r||3)+'">'+esc(e[k]||"")+'</textarea></label>'};
  openModal('<h2>'+(id?'Editar anotação':'Nova anotação')+'</h2>'+(isOt?ta('e_a','Texto do Antigo Testamento','a',1)+ta('e_n','Texto do Novo Testamento','n',1)+ta('e_r','O que a ligação revela','r'):inp('e_ref','Referência','ref')+ta('e_txt','O que diz sobre o tema','txt')+inp('e_ep','Fase / época','ep')+ta('e_liga','Liga com','liga',1))+
   '<div class="acts"><button class="btn" data-act="bentSave" data-id="'+(id||"")+'">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(id?'<button class="btn danger" data-act="bentDel" data-id="'+id+'">Apagar</button>':'')+'</div>');
}
function bTempo(){
  var B=S.bib;
  var h='<div class="card"><div class="row" style="flex-wrap:wrap"><h2>Linha do tempo histórica</h2><div class="sp"></div>'+Object.keys(EMP).map(function(k){return '<span class="tag" style="--cc:'+EMP[k]+'">'+k+'</span>'}).join(" ")+'</div><p class="muted" style="margin:4px 0 12px">Preencha as datas conforme a sua Bíblia de estudo indicar, pois algumas são debatidas.</p><div class="tline">';
  TLR.forEach(function(r){
    var o=B.tl[r[0]]||{},dt=o.date!=null?o.date:r[2],emp=o.emp||"",c=emp&&EMP[emp]?EMP[emp]:"var(--line)";
    h+='<div class="tli" style="--tc:'+c+'"><div class="tdot"></div><div class="tcard"><div><b>'+esc(r[1])+'</b><div class="muted">'+esc(r[3])+'</div></div><label class="fld"><span>Data aproximada</span><input data-bf="tl.'+r[0]+'.date" value="'+esc(dt)+'" placeholder="a preencher"></label><label class="fld"><span>Império da época</span><select data-bf="tl.'+r[0]+'.emp" data-r="1"><option value="">Escolher</option>'+Object.keys(EMP).map(function(k){return '<option'+(emp===k?' selected':'')+'>'+k+'</option>'}).join("")+'</select></label></div></div>';
  });
  return h+'</div></div>';
}
function bEvol(){
  var B=S.bib,ph=ui.bph==null?bcur():ui.bph,ck=B.check[ph]||{};
  var h='<div class="grid two"><div class="card"><h2>Checkpoint de fase</h2><div class="muted">Ao concluir cada fase, responda as 5 perguntas.</div><div class="chips" style="margin:10px 0">'+PHN.map(function(n,i){return '<button class="cchip" aria-pressed="'+(i===ph)+'" data-act="bph" data-n="'+i+'">'+i+' · '+n+'</button>'}).join("")+'</div>';
  CHQ.forEach(function(q,i){h+='<label class="fld">'+(i+1)+'. '+q+'<textarea class="autoh" rows="3" data-bf="check.'+ph+'.'+i+'">'+esc(ck[i]||"")+'</textarea></label>'});
  var nx=parse(B.cover.ini);nx.setMonth(nx.getMonth()+3*(B.retros.length+1));
  h+='</div><div class="card"><div class="row"><h2>Retrospectiva trimestral</h2><div class="sp"></div><button class="btn" data-act="bretroNew">Nova</button></div><div class="muted" style="margin-bottom:8px">Próxima sugerida: '+fmtFull(iso(nx))+'</div>';
  h+=B.retros.length?B.retros.slice().reverse().map(function(r){return '<div class="li"><div class="tb"><div class="lt"><b>'+fmtFull(r.from)+' a '+fmtFull(r.to)+'</b></div><div class="tn">'+RTA.map(function(a,i){return a.split(" ")[0]+' '+(r.notes[i]||"-")}).join(" · ")+'</div></div><button class="mini" data-act="bretroEdit" data-id="'+r.id+'">Abrir</button></div>'}).join(""):'<p class="muted">Nenhuma retrospectiva ainda.</p>';
  return h+'</div></div>';
}
function retroForm(id){
  var r=id?S.bib.retros.filter(function(x){return x.id===id})[0]:null;r=r||{ans:{},notes:{}};
  var to=TODAY,fr=addDays(TODAY,-90);
  openModal('<h2>'+(id?'Retrospectiva':'Nova retrospectiva')+'</h2><div class="fr"><label class="fld">De<input id="r_from" type="date" value="'+(r.from||fr)+'"></label><label class="fld">Até<input id="r_to" type="date" value="'+(r.to||to)+'"></label></div>'+
   RTQ.map(function(q,i){return '<label class="fld">'+(i+1)+'. '+q+'<textarea class="autoh" id="r_a'+i+'" rows="2">'+esc(r.ans[i]||"")+'</textarea></label>'}).join("")+
   '<div class="fld">Medida de evolução (de 1 a 5)</div>'+RTA.map(function(a,i){return '<div class="row" style="margin-bottom:6px"><span class="sp">'+a+'</span><select id="r_n'+i+'">'+[0,1,2,3,4,5].map(function(n){return '<option value="'+n+'"'+((r.notes[i]||0)==n?' selected':'')+'>'+(n||"-")+'</option>'}).join("")+'</select></div>'}).join("")+
   '<div class="acts"><button class="btn" data-act="bretroSave" data-id="'+(id||"")+'">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(id?'<button class="btn danger" data-act="bretroDel" data-id="'+id+'">Apagar</button>':'')+'</div>','wide');
}
document.addEventListener("change",function(e){var el=e.target,bf=el&&el.getAttribute&&el.getAttribute("data-bf");if(!bf)return;setPath(S.bib,bf.split("."),el.type==="checkbox"?el.checked:el.value);save();if(el.getAttribute("data-r"))render()});

S=load();
var TABS=[["hoje","","Hoje"],["semana","","Semana"],["habitos","","Hábitos"],["mapa","","Desenvolvimento"],["biblia","","Devocional"]];
function render(){
  document.documentElement.setAttribute("data-theme",S.theme||"");
  if(!S.theme)document.documentElement.removeAttribute("data-theme");
  $("#greet").textContent=greeting();
  
  var subs="";
  if(ui.tab==="biblia"){subs='<span class="tdiv"></span>'+BSUBS.map(function(x){return '<button class="tab sub" role="tab" aria-selected="'+((ui.bsub||"visao")===x[0])+'" data-act="bsub" data-id="'+x[0]+'">'+x[1]+'</button>'}).join("")}
  $("#tabs").innerHTML=TABS.map(function(t){return '<button class="tab" role="tab" aria-selected="'+(ui.tab===t[0])+'" data-act="tab" data-id="'+t[0]+'">'+t[2]+'</button>'}).join("")+subs;
  $("#bnav").innerHTML=TABS.map(function(t){return '<button aria-selected="'+(ui.tab===t[0])+'" data-act="tab" data-id="'+t[0]+'">'+t[2]+'</button>'}).join("");
  var v={hoje:viewHoje,semana:viewSemana,habitos:viewHabitos,amor:viewAmor,dev:viewDev,biblia:viewBiblia}[ui.tab];
  var isM=ui.tab==="mapa";
  $("#view").hidden=isM;$("#mapaRoot").hidden=!isM;
  if(!isM){$("#view").innerHTML=v();fitAll()}
  else if(ui.mapaTo!=null){var mt=ui.mapaTo;ui.mapaTo=null;if(window.mapaOpen)window.mapaOpen(+mt)}
}

/* ---------- modais ---------- */
function openModal(html,cls){$("#modal").innerHTML='<div class="ov" data-act="ovClose"><div class="md '+(cls||"")+'" role="dialog" aria-modal="true">'+html+'</div></div>';fitAll();requestAnimationFrame(fitAll)}
/* caixas de texto que crescem com o conteúdo (Bíblia): sem rolagem interna */
function fitTA(t){
  if(!t||!t.getClientRects().length)return;
  var sc=t.closest(".md"),top=sc?sc.scrollTop:0,se=document.scrollingElement,y=se?se.scrollTop:0;
  t.style.height="auto";
  t.style.height=(t.scrollHeight+t.offsetHeight-t.clientHeight)+"px";
  if(sc)sc.scrollTop=top;
  if(se&&se.scrollTop!==y)se.scrollTop=y;
}
function fitAll(){document.querySelectorAll("textarea.autoh").forEach(fitTA)}
document.addEventListener("input",function(e){var t=e.target;if(t&&t.classList&&t.classList.contains("autoh"))fitTA(t)});
window.addEventListener("resize",fitAll);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitAll);
function closeModal(){$("#modal").innerHTML=""}
var form={em:"",days:[],kind:"check"};
function stickerPicker(sel){return "";return '<div class="stks">'+STICKERS.map(function(s){return '<button type="button" class="'+(s===sel?'on':'')+'" data-act="pickEm" data-e="'+s+'">'+s+'</button>'}).join("")+'</div>'}
function taskForm(id){
  var t=id?S.tasks.filter(function(x){return x.id===id})[0]:null;
  var d=ui.date;
  form={em:t?t.em:"",days:t&&t.days?t.days.slice():[parse(d).getDay()],id:id||null};
  openModal('<h2>'+(t?'Editar tarefa':'Nova tarefa')+'</h2>'+
   ''+stickerPicker(form.em)+
   '<label class="fld">Nome<input id="f_t" value="'+esc(t?t.t:"")+'" placeholder="Ex.: Ligar para o cliente"></label>'+
   '<div class="fr"><label class="fld">Início<input id="f_s" type="time" value="'+(t?t.s:"14:00")+'"></label><label class="fld">Fim<input id="f_e" type="time" value="'+(t?t.e:"15:00")+'"></label></div>'+
   '<label class="fld">Categoria (cor)<select id="f_c">'+Object.keys(CATS).map(function(k){return '<option value="'+k+'"'+((t?t.cat:"leve")===k?' selected':'')+'>'+CATS[k][0]+'</option>'}).join("")+'</select></label>'+
   
   '<div class="fld">Repete nos dias</div><div class="dy" id="f_d">'+DS.map(function(n,i){return '<button type="button" class="'+(form.days.indexOf(i)>-1?'on':'')+'" data-act="pickDay" data-i="'+i+'">'+n+'</button>'}).join("")+'</div>'+
   '<label class="fld" style="flex-direction:row;align-items:center;gap:8px;margin-top:10px"><input id="f_o" type="checkbox"'+(t&&t.opt?' checked':'')+'> Opcional (some no “dia puxado”)</label>'+
   '<div class="acts"><button class="btn" data-act="saveTask" data-m="all">Salvar nos dias marcados</button><button class="btn soft" data-act="saveTask" data-m="one">Só em '+fmtDM(d)+'</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(t?'<button class="btn danger" data-act="delTask" data-id="'+t.id+'">Apagar</button>':'')+'</div>');
}
function habitForm(id){
  var h=id?habitOf(id):null;
  form={em:h?h.em:"",kind:h?h.kind:"check",id:id||null};
  openModal('<h2>'+(h?'Editar hábito':'Novo hábito')+'</h2>'+stickerPicker(form.em)+
   '<label class="fld">Nome<input id="h_n" value="'+esc(h?h.name:"")+'" placeholder="Ex.: Alongar 10 min"></label>'+
   '<label class="fld">Tipo<select id="h_k"><option value="check"'+(form.kind==="check"?' selected':'')+'>Fez / não fez</option><option value="count"'+(form.kind==="count"?' selected':'')+'>Contador (com meta)</option></select></label>'+
   '<div class="fr"><label class="fld">Meta<input id="h_g" type="number" min="1" value="'+(h&&h.goal?h.goal:10)+'"></label><label class="fld">Unidade<input id="h_u" value="'+esc(h&&h.unit?h.unit:"vezes")+'"></label><label class="fld">Passo (+)<input id="h_s" type="number" min="1" value="'+(h&&h.step?h.step:1)+'"></label></div>'+
   '<label class="fld">Meta por semana (opcional, só para “fez/não fez”)<input id="h_w" type="number" min="0" value="'+(h&&h.weekly?h.weekly:"")+'"></label>'+
   '<p class="note">Meta, unidade e passo valem só para contadores.</p>'+
   '<div class="acts"><button class="btn" data-act="saveHabit">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(h?'<button class="btn danger" data-act="delHabit" data-id="'+h.id+'">Apagar</button>':'')+'</div>');
}
function simpleForm(title,fields,act,extra){
  openModal('<h2>'+title+'</h2>'+fields+'<div class="acts"><button class="btn" data-act="'+act+'" '+(extra||'')+'>Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button></div>');
}

/* ---------- ações ---------- */
document.addEventListener("click",function(ev){
  var el=ev.target.closest("[data-act]");if(!el)return;
  var a=el.getAttribute("data-act"),id=el.getAttribute("data-id");
  if(a==="ovClose"){if(ev.target===el)closeModal();return}
  var cx=ev.clientX,cy=ev.clientY;
  switch(a){
  case "theme":S.theme=S.theme==="dark"?"light":"dark";break;
  case "tab":ui.tab=id;break;
  case "mapaGo":ui.tab="mapa";ui.mapaTo=el.getAttribute("data-s");break;
  case "day":ui.date=addDays(ui.date,+el.getAttribute("data-n"));break;
  case "goToday":ui.date=TODAY;break;
  case "goDay":ui.date=el.getAttribute("data-d");ui.tab="hoje";break;
  case "cancelTask":{S.cancel[ui.date]=S.cancel[ui.date]||{};if(S.cancel[ui.date][id]){delete S.cancel[ui.date][id]}else{S.cancel[ui.date][id]=1;setDone(id,ui.date,false)}break}
  case "toggleTask":{
    var t=S.tasks.filter(function(x){return x.id===id})[0],v=!isDone(id,ui.date);
    setDone(id,ui.date,v);
    if(t&&t.h){var h=habitOf(t.h);if(h&&h.kind==="check")setHv(h.id,ui.date,v?1:0);else if(h&&h.kind==="count"&&h.id!=="agua")setHv(h.id,ui.date,v?h.goal:0)}
    if(v)pop(cx,cy,t&&t.em);break}
  case "dayMode":{
    var m=el.getAttribute("data-m"),dd=ui.date;S.light=S.light||{};
    if(m==="puxado"){
      S.heavy[dd]=true;delete S.light[dd];
      S.tasks=S.tasks.filter(function(x){if(x.only===dd&&x.h==="corrida"){setDone(x.id,dd,false);return false}return true});
    }else{
      delete S.heavy[dd];S.light[dd]=true;
      var has=S.tasks.some(function(x){return x.h==="corrida"&&occurs(x,dd)});
      if(!has)S.tasks.push({id:uid(),t:"Corrida de 30 a 40 min",em:"",s:"17:15",e:"17:55",cat:"saude",only:dd,h:"corrida",note:"Dia leve, bora!"});
      pop(cx,cy,"");
    }
    break}
  case "hcheck":{
    var h2=habitOf(id),v2=!achieved(h2,ui.date);setHv(id,ui.date,v2?(h2.kind==="check"?1:h2.goal):0);
    S.tasks.forEach(function(t2){if(t2.h===id&&occurs(t2,ui.date))setDone(t2.id,ui.date,v2)});
    if(v2)pop(cx,cy,h2.em);break}
  case "hstep":{
    var h3=habitOf(id),n=+el.getAttribute("data-n"),cur=hv(id,ui.date),nv=Math.max(0,cur+n);setHv(id,ui.date,nv);
    if(n>0)pop(cx,cy,h3.em);
    S.tasks.forEach(function(t3){if(t3.h===id&&occurs(t3,ui.date))setDone(t3.id,ui.date,achieved(h3,ui.date))});break}
  case "newTask":taskForm(null);return;
  case "editTask":taskForm(id);return;
  case "pickEm":form.em=el.getAttribute("data-e");[].forEach.call(document.querySelectorAll(".stks button"),function(b){b.classList.toggle("on",b===el)});return;
  case "pickDay":{var i=+el.getAttribute("data-i"),k=form.days.indexOf(i);if(k>-1)form.days.splice(k,1);else form.days.push(i);el.classList.toggle("on");return}
  case "saveTask":{
    var title=$("#f_t").value.trim();if(!title){$("#f_t").focus();return}
    var data={t:title,em:"",s:$("#f_s").value||"09:00",e:$("#f_e").value||"10:00",cat:$("#f_c").value,opt:$("#f_o").checked};
    var orig=form.id?S.tasks.filter(function(x){return x.id===form.id})[0]:null,m=el.getAttribute("data-m");
    if(m==="one"){
      if(orig&&orig.only){Object.assign(orig,data)}
      else{
        if(orig){orig.except=(orig.except||[]).concat([ui.date])}
        S.tasks.push(Object.assign({id:uid(),only:ui.date,h:orig?orig.h:undefined},data));
      }
    }else{
      if(!form.days.length){alert("Marque pelo menos um dia.");return}
      if(orig){Object.assign(orig,data);delete orig.only;orig.days=form.days.slice()}
      else S.tasks.push(Object.assign({id:uid(),days:form.days.slice()},data));
    }
    closeModal();break}
  case "delTask":{
    var tt=S.tasks.filter(function(x){return x.id===id})[0];
    if(tt&&tt.only){S.tasks=S.tasks.filter(function(x){return x.id!==id});closeModal();break}
    openModal('<h2>Apagar “'+esc(tt.t)+'”?</h2><div class="acts"><button class="btn" data-act="delOne" data-id="'+id+'">Só em '+fmtDM(ui.date)+'</button><button class="btn danger" data-act="delAll" data-id="'+id+'">Em todos os dias</button><button class="btn soft" data-act="closeModal">Fechar</button></div>');return}
  case "delOne":{var o=S.tasks.filter(function(x){return x.id===id})[0];o.except=(o.except||[]).concat([ui.date]);closeModal();break}
  case "delAll":S.tasks=S.tasks.filter(function(x){return x.id!==id});closeModal();break;
  case "closeModal":closeModal();return;
  case "newHabit":habitForm(null);return;
  case "editHabit":habitForm(id);return;
  case "saveHabit":{
    var nm=$("#h_n").value.trim();if(!nm){$("#h_n").focus();return}
    var k2=$("#h_k").value,hh=form.id?habitOf(form.id):null;
    var hd={em:form.em,name:nm,kind:k2,goal:Math.max(1,+$("#h_g").value||1),unit:$("#h_u").value.trim()||"vezes",step:Math.max(1,+$("#h_s").value||1),weekly:+$("#h_w").value||0};
    if(k2==="check"){delete hd.goal;delete hd.unit;delete hd.step}
    if(!hd.weekly||k2!=="check")delete hd.weekly;
    if(hh){["goal","unit","step","weekly"].forEach(function(p){delete hh[p]});Object.assign(hh,hd)}
    else S.habits.push(Object.assign({id:uid()},hd));
    closeModal();break}
  case "delHabit":S.habits=S.habits.filter(function(x){return x.id!==id});closeModal();break;
  case "listToggle":{
    var l=S.lists[el.getAttribute("data-l")],it=l.filter(function(x){return x.id===id})[0];it.done=!it.done;if(it.done)pop(cx,cy,"");break}
  case "listDel":{var ln=el.getAttribute("data-l");S.lists[ln]=S.lists[ln].filter(function(x){return x.id!==id});break}
  case "listAdd":{
    var lk=el.getAttribute("data-l");
    simpleForm("Novo item",'<label class="fld">Descrição<input id="l_t"></label>'+(lk==="tcc"?'<label class="fld">Página / grupo<input id="l_g" placeholder="Ex.: p. 20, G. Referências"></label>':'<label class="fld">Grupo<select id="l_g"><option>Antes</option><option>Takes</option><option>Conversa</option><option>Depois</option></select></label>'),"saveListItem",'data-l="'+lk+'"');return}
  case "saveListItem":{
    var lk2=el.getAttribute("data-l"),tx=$("#l_t").value.trim();if(!tx)return;
    var g=$("#l_g").value.trim();
    if(lk2==="tcc"){var n2=S.lists.tcc.length+1;S.lists.tcc.push({id:uid(),n:n2,g:"Extras",pg:g||"—",t:tx,plan:"Sex 06/11",done:false})}
    else{var arr=S.lists.gym,pos=arr.map(function(x){return x.g}).lastIndexOf(g);var ni={id:uid(),t:tx,g:g,done:false};arr.splice(pos<0?arr.length:pos+1,0,ni)}
    closeModal();break}
  case "mStatus":{var mi=S.lists.mauro.filter(function(x){return x.id===id})[0];mi.st=(mi.st+1)%4;if(mi.st===3)pop(cx,cy,"");break}
  case "mEdit":case "mAdd":{
    var me=a==="mEdit"?S.lists.mauro.filter(function(x){return x.id===id})[0]:null;
    openModal('<h2>'+(me?'Editar conteúdo':'Novo conteúdo')+'</h2><label class="fld">Data<input id="m_d" type="date" value="'+(me?me.d:"2026-11-30")+'"></label><label class="fld">Formato<select id="m_f"><option'+(me&&me.f==="Reels"?' selected':'')+'>Reels</option><option'+(!me||me.f==="Carrossel"?' selected':'')+'>Carrossel</option><option'+(me&&me.f==="Stories"?' selected':'')+'>Stories</option></select></label><label class="fld">Tema<input id="m_t" value="'+esc(me?me.t:"")+'"></label><div class="acts"><button class="btn" data-act="saveM" data-id="'+(me?me.id:"")+'">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(me?'<button class="btn danger" data-act="delM" data-id="'+me.id+'">Apagar</button>':'')+'</div>');return}
  case "saveM":{
    var tx2=$("#m_t").value.trim();if(!tx2)return;
    var rec=id?S.lists.mauro.filter(function(x){return x.id===id})[0]:null;
    if(rec){rec.d=$("#m_d").value;rec.f=$("#m_f").value;rec.t=tx2}
    else S.lists.mauro.push({id:uid(),d:$("#m_d").value,f:$("#m_f").value,t:tx2,st:0});
    S.lists.mauro.sort(function(x,y){return x.d<y.d?-1:x.d>y.d?1:0});closeModal();break}
  case "delM":S.lists.mauro=S.lists.mauro.filter(function(x){return x.id!==id});closeModal();break;
  case "hp":ui.hp=+el.getAttribute("data-n");break;
  case "hDay":ui.date=el.getAttribute("data-d");break;
  case "verse":VI=(VI+1+Math.floor(Math.random()*(VERSES.length-1)))%VERSES.length;break;
  case "stage":S.stage=+el.getAttribute("data-n");break;
  case "marco":S.marco[S.stage]=!S.marco[S.stage];if(S.marco[S.stage])pop(cx,cy);break;
  case "cliSel":S.cli.sel=id;break;
  case "cTaskToggle":{var ct=S.cli.tasks.filter(function(x){return x.id===id})[0];ct.done=!ct.done;if(ct.done)pop(cx,cy);break}
  case "cTaskAdd":case "cTaskEdit":{
    var ce=a==="cTaskEdit"?S.cli.tasks.filter(function(x){return x.id===id})[0]:null;
    var pre=ce?ce.c:(S.cli.sel!=="all"?S.cli.sel:S.cli.list[0].id);
    openModal('<h2>'+(ce?'Editar tarefa':'Nova tarefa')+'</h2><label class="fld">Tarefa<input id="ct_t" value="'+esc(ce?ce.t:"")+'"></label><div class="fr"><label class="fld">Cliente<select id="ct_c">'+S.cli.list.map(function(c){return '<option value="'+c.id+'"'+(c.id===pre?' selected':'')+'>'+esc(c.n)+'</option>'}).join("")+'</select></label><label class="fld">Prazo<input id="ct_d" type="date" value="'+(ce&&ce.due?ce.due:"")+'"></label></div><div class="acts"><button class="btn" data-act="cTaskSave" data-id="'+(ce?ce.id:"")+'">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(ce?'<button class="btn danger" data-act="cTaskDel" data-id="'+ce.id+'">Apagar</button>':'')+'</div>');return}
  case "cTaskSave":{
    var tx3=$("#ct_t").value.trim();if(!tx3)return;
    var rec2=id?S.cli.tasks.filter(function(x){return x.id===id})[0]:null;
    if(rec2){rec2.t=tx3;rec2.c=$("#ct_c").value;rec2.due=$("#ct_d").value||null}
    else S.cli.tasks.push({id:uid(),c:$("#ct_c").value,t:tx3,due:$("#ct_d").value||null,done:false});
    closeModal();break}
  case "cTaskDel":S.cli.tasks=S.cli.tasks.filter(function(x){return x.id!==id});closeModal();break;
  case "cliAdd":case "cliEdit":{
    var cl=a==="cliEdit"?cliById(id):null,cols=["#E07A4E","#6C8EE8","#45B58B","#E4799B","#9C7BE0","#EAAE5C"];
    form.col=cl?cl.c:cols[S.cli.list.length%cols.length];
    openModal('<h2>'+(cl?'Editar cliente':'Novo cliente')+'</h2><label class="fld">Nome<input id="cl_n" value="'+esc(cl?cl.n:"")+'"></label><div class="fld">Cor</div><div class="dy" id="cl_c">'+cols.map(function(c){return '<button type="button" data-act="pickCol" data-c="'+c+'" class="'+(c===form.col?'on':'')+'" style="background:'+c+'"></button>'}).join("")+'</div><div class="acts"><button class="btn" data-act="cliSave" data-id="'+(cl?cl.id:"")+'">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(cl?'<button class="btn danger" data-act="cliDel" data-id="'+cl.id+'">Apagar cliente</button>':'')+'</div>');return}
  case "pickCol":form.col=el.getAttribute("data-c");[].forEach.call(document.querySelectorAll("#cl_c button"),function(b){b.classList.toggle("on",b===el)});return;
  case "cliSave":{
    var nm2=$("#cl_n").value.trim();if(!nm2)return;
    var cr=id?cliById(id):null;
    if(cr){cr.n=nm2;cr.c=form.col}else{var nid=uid();S.cli.list.push({id:nid,n:nm2,c:form.col});S.cli.sel=nid}
    closeModal();break}
  case "cliDel":S.cli.list=S.cli.list.filter(function(c){return c.id!==id});S.cli.tasks=S.cli.tasks.filter(function(x){return x.c!==id});S.cli.sel="all";closeModal();break;
  case "bsub":ui.bsub=id;break;
  case "bguia":ui.bguia=ui.bguia||{};ui.bguia[id]=!ui.bguia[id];break;
  case "bsf":ui.bsf=id==="all"?"all":+id;break;
  case "bcol":ui.bcol=ui.bcol||{};ui.bcol[id]=!ui.bcol[id];break;
  case "bwk":ui.bwk=addDays(ui.bwk||TODAY,+el.getAttribute("data-n"));break;
  case "bwday":{var wd=el.getAttribute("data-d");if(S.bib.week[wd])delete S.bib.week[wd];else{S.bib.week[wd]=1;pop(cx,cy)}break}
  case "bbook":{var bo=S.bib.books[id]||(S.bib.books[id]={st:0});bo.st=(bo.st+1)%3;if(bo.st===2){if(!bo.date)bo.date=TODAY;pop(cx,cy)}else if(bo.st===1){bo.date="";if(!bo.ini)bo.ini=TODAY}else{bo.date="";bo.note=""}break}
  case "bsessNew":sessForm(null);return;
  case "bsessEdit":sessForm(id);return;
  case "bsessSave":{
    var g=function(i){return $("#"+i).value.trim()},sd={date:$("#s_date").value||TODAY,book:$("#s_book").value,pass:g("s_pass"),ora:$("#s_ora").checked,ctx:g("s_ctx"),r1:$("#s_r1").checked,r2:$("#s_r2").checked,obs:g("s_obs"),int:g("s_int"),con:g("s_con"),perg:g("s_perg"),verd:g("s_verd"),atit:g("s_atit"),resp:g("s_resp")};
    sd.n=[sd.ora,!!sd.ctx,sd.r1&&sd.r2,!!sd.obs,!!sd.int,!!sd.con,!!(sd.verd||sd.atit),true].filter(Boolean).length;
    var so=id?S.bib.sessions.filter(function(x){return x.id===id})[0]:null;
    if(so)Object.assign(so,sd);else{sd.id=uid();S.bib.sessions.push(sd)}
    S.bib.week[sd.date]=1;closeModal();break}
  case "bsessDel":S.bib.sessions=S.bib.sessions.filter(function(x){return x.id!==id});closeModal();break;
  case "bfio":ui.bfio=id;break;
  case "bfioNew":case "bfioEditFio":{
    var fo=a==="bfioEditFio"?S.bib.fios.filter(function(x){return x.id===id})[0]:null;
    openModal('<h2>'+(fo?'Editar fio':'Novo fio temático')+'</h2><label class="fld">Nome<input id="fo_n" value="'+esc(fo?fo.n:"")+'"></label><label class="fld">Dica (opcional)<input id="fo_h" value="'+esc(fo&&fo.hint?fo.hint:"")+'"></label><div class="acts"><button class="btn" data-act="bfioSave" data-id="'+(fo?fo.id:"")+'">Salvar</button><button class="btn soft" data-act="closeModal">Fechar</button>'+(fo?'<button class="btn danger" data-act="bfioDel" data-id="'+fo.id+'">Apagar fio</button>':'')+'</div>');return}
  case "bfioSave":{var fn=$("#fo_n").value.trim();if(!fn)return;var fr2=id?S.bib.fios.filter(function(x){return x.id===id})[0]:null;if(fr2){fr2.n=fn;fr2.hint=$("#fo_h").value.trim()}else{var nf=uid();S.bib.fios.push({id:nf,n:fn,hint:$("#fo_h").value.trim()});ui.bfio=nf}closeModal();break}
  case "bfioDel":S.bib.fios=S.bib.fios.filter(function(x){return x.id!==id});delete S.bib.threads[id];ui.bfio=null;closeModal();break;
  case "bentNew":entForm(null);return;
  case "bentEdit":entForm(id);return;
  case "bentSave":{
    var sl=ui.bfio||S.bib.fios[0].id,ot=sl==="ot",ev=function(i){return $("#"+i).value.trim()};
    var ed=ot?{a:ev("e_a"),n:ev("e_n"),r:ev("e_r")}:{ref:ev("e_ref"),txt:ev("e_txt"),ep:ev("e_ep"),liga:ev("e_liga")};
    var arr=ot?S.bib.ot:(S.bib.threads[sl]=S.bib.threads[sl]||[]);
    var er=id?arr.filter(function(x){return x.id===id})[0]:null;
    if(er)Object.assign(er,ed);else{ed.id=uid();arr.push(ed)}
    closeModal();break}
  case "bentDel":{var sl2=ui.bfio||S.bib.fios[0].id;if(sl2==="ot")S.bib.ot=S.bib.ot.filter(function(x){return x.id!==id});else S.bib.threads[sl2]=(S.bib.threads[sl2]||[]).filter(function(x){return x.id!==id});closeModal();break}
  case "bph":ui.bph=+el.getAttribute("data-n");break;
  case "bretroNew":retroForm(null);return;
  case "bretroEdit":retroForm(id);return;
  case "bretroSave":{
    var rd={from:$("#r_from").value,to:$("#r_to").value,ans:{},notes:{}};
    for(var q=0;q<5;q++){rd.ans[q]=$("#r_a"+q).value.trim();rd.notes[q]=+$("#r_n"+q).value||0}
    var rr=id?S.bib.retros.filter(function(x){return x.id===id})[0]:null;
    if(rr)Object.assign(rr,rd);else{rd.id=uid();S.bib.retros.push(rd)}
    closeModal();break}
  case "bretroDel":S.bib.retros=S.bib.retros.filter(function(x){return x.id!==id});closeModal();break;
  case "devBlock":{S.dev[ui.date]=S.dev[ui.date]||{};if(S.dev[ui.date][id]){delete S.dev[ui.date][id]}else{S.dev[ui.date][id]=1;pop(cx,cy,"")}break}
  case "scale":S.devScale=+el.getAttribute("data-n");break;
  default:return;
  }
  save();render();
});
document.addEventListener("change",function(e){if(e.target&&e.target.id==="hdate"&&e.target.value){ui.date=e.target.value;render()}});
render();
setInterval(function(){if(!document.hidden&&!$("#modal").innerHTML&&ui.tab==="hoje")render()},60000);
