# Minha rotina

Planner pessoal em HTML, CSS e JavaScript puros, sem build e sem dependências. Reúne:

- **Hoje, Semana e Hábitos:** agenda diária com blocos de horário, hábitos e metas.
- **Devocional:** aba de acompanhamento da leitura.
- **Desenvolvimento:** mapa de estudos em etapas, vagas-alvo, textos prontos e preparo para entrevistas (uma sub-aba por entrevista).

Tudo o que você marca e escreve fica salvo no próprio navegador (`localStorage`). Não há servidor nem banco de dados.

## Estrutura

```
.
├── index.html                 # marcação das telas
├── css/
│   └── styles.css             # todo o visual (tema claro e escuro)
├── js/
│   ├── estudos.js             # aba Estudos
│   ├── vagas.js               # aba Vagas-alvo (planilha de candidaturas)
│   ├── textos.js              # aba Textos
│   ├── entrevista-concert.js  # entrevista Concert: checklist, perguntas e respostas
│   ├── entrevista-grownt.js   # entrevista Grownt: checklist, perguntas e respostas
│   ├── entrevistas-subabas.js # troca entre as sub-abas de entrevistas
│   ├── mapa.js                # mapa Desenvolvimento: etapas, progresso e navegação por abas
│   ├── agenda.js              # agenda (Hoje, Semana, Hábitos, Devocional)
│   └── backup.js              # botão Dados: exportar e importar o progresso
└── .github/workflows/pages.yml  # publicação automática no GitHub Pages
```

A ordem dos `<script>` no `index.html` importa, então não a altere.

## Rodar no seu computador

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8080
# depois acesse http://localhost:8080
```

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Primeira versão do planner"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/minha-rotina.git
git push -u origin main
```

Para publicar como site, em **Settings > Pages**, escolha **Source: GitHub Actions**. O workflow `.github/workflows/pages.yml` publica a cada push na `main`.

## Onde editar

| O que mudar | Onde |
| --- | --- |
| Blocos de horário da agenda e tarefas de datas específicas | `js/agenda.js` (`defTasks()` e `newTasks()`) |
| Perguntas, respostas-modelo e checklist de uma entrevista | `js/entrevista-*.js` (listas `CHECKS` e `QA`) |
| Nova entrevista | copie `entrevista-concert.js`, o bloco `data-sub="concert"` no `index.html` e o botão em `.ivtabs` |
| Vagas iniciais | `js/vagas.js` (lista `SEED`) |
| Cores e tipografia | variáveis no topo de `css/styles.css` |

## Dados salvos no navegador

O progresso (checklists, respostas, anotações, candidaturas, hábitos) fica no `localStorage` de cada navegador e de cada endereço. Por isso:

- Ao abrir o projeto em outro endereço (por exemplo, `localhost` ou o GitHub Pages), você começa do zero.
- Limpar os dados do site apaga o progresso.
- O repositório guarda apenas o conteúdo-base, nunca o que você marcou.

Para levar o progresso de um lugar para outro, use o botão **Dados**, no topo:

- **Exportar:** "Baixar arquivo" gera `minha-rotina-backup-AAAA-MM-DD.json`. "Copiar texto" serve quando o download for bloqueado.
- **Importar:** escolha o arquivo ou cole o texto e confirme. A importação **substitui** os dados atuais do navegador.
- O backup só inclui as chaves do planner (`rotina-*` e `mapa-*`). Ele contém suas anotações, então não o suba para um repositório público.

## Fontes

Usa Fraunces e Work Sans pelo Google Fonts. Sem conexão, o navegador usa as fontes padrão do sistema.
