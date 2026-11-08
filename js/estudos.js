(function () {
  var CEV = 'https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1';
  var MDN = 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/';
  var JI = 'https://javascript.info/';
  var TOPICS = [
    { id: 'ambiente', t: 'Ambiente e variáveis',
      est: 'O que é uma variável, let e const, nomes válidos, console.log e o console do navegador (tecla F12).',
      pr: 'Guarde nome, idade e cidade em variáveis e mostre uma frase com elas. Tente mudar o valor de uma const e leia a mensagem de erro.',
      ok: 'Você explica a diferença entre let e const sem olhar e não precisa de var.',
      res: [['Curso em Vídeo: módulos A e B', CEV], ['javascript.info: Developer console', JI + 'devtools'], ['javascript.info: Variables', JI + 'variables'], ['MDN: Sintaxe e tipos (declarações)', MDN + 'Grammar_and_types']] },
    { id: 'tipos', t: 'Tipos de dados',
      est: 'Os tipos number, string, boolean, null e undefined, o operador typeof e a conversão de tipos (Number e String).',
      pr: 'Escreva 10 valores diferentes e preveja o typeof de cada um antes de rodar. Compare “5” + 1 com “5” - 1 e explique o resultado.',
      ok: 'Você prevê o resultado de “5” + 1 e de “5” - 1 e sabe converter um texto em número.',
      res: [['javascript.info: Data types', JI + 'types'], ['javascript.info: Type conversions', JI + 'type-conversions'], ['MDN: Sintaxe e tipos (estruturas de dados)', MDN + 'Grammar_and_types'], ['Curso em Vídeo: módulo B', CEV]] },
    { id: 'operadores', t: 'Operadores e comparações',
      est: 'Operadores aritméticos, de atribuição e de comparação, a diferença entre === e ==, e valores truthy e falsy.',
      pr: 'Calcule a média de três notas. Leia dois números e diga qual é o maior.',
      ok: 'Você usa === por padrão e explica por que evita ==.',
      res: [['javascript.info: Basic operators', JI + 'operators'], ['javascript.info: Comparisons', JI + 'comparison'], ['MDN: Expressões e operadores', MDN + 'Expressions_and_operators'], ['Curso em Vídeo: módulo B', CEV]] },
    { id: 'condicionais', t: 'Condicionais',
      est: 'if, else if e else, operadores lógicos (&& || !), operador ternário e switch.',
      pr: 'Classifique uma nota em aprovado, recuperação ou reprovado. Diga se um número é par ou ímpar. Mostre o dia da semana a partir de um número, usando switch.',
      ok: 'Você escreve um if com else if sem consultar e sabe quando usar switch.',
      res: [['javascript.info: Conditional branching', JI + 'ifelse'], ['javascript.info: Logical operators', JI + 'logical-operators'], ['javascript.info: The switch statement', JI + 'switch'], ['MDN: Controle de fluxo', MDN + 'Control_flow_and_error_handling'], ['Curso em Vídeo: módulo D', CEV]] },
    { id: 'lacos', t: 'Laços de repetição',
      est: 'while, do...while e for, break e continue, e como evitar um laço infinito.',
      pr: 'Mostre a tabuada de um número. Some os números de 1 a 100. Resolva o FizzBuzz.',
      ok: 'Você resolve a tabuada e o FizzBuzz sem consultar.',
      res: [['javascript.info: Loops, while and for', JI + 'while-for'], ['MDN: Laços e iteração', MDN + 'Loops_and_iteration'], ['Curso em Vídeo: módulo E', CEV]] },
    { id: 'revisao', t: 'Revisão e exercícios',
      est: 'Refaça, sem olhar, as práticas das sessões anteriores e anote onde travou.',
      pr: 'Faça os primeiros exercícios da trilha de JavaScript do Exercism, que libera os conceitos básicos primeiro.',
      ok: 'Você terminou os exercícios básicos e tem uma lista de dúvidas para levar à próxima etapa.',
      res: [['Exercism: trilha de JavaScript', 'https://exercism.org/tracks/javascript']] }
  ];
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function link(text, href, cls) {
    var a = el('a', cls, text); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
  }
  function okUrl(u) {
    u = (u || '').trim(); if (!u) return null;
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    try { var x = new URL(u); return (x.protocol === 'http:' || x.protocol === 'https:') ? x.href : null; } catch (e) { return null; }
  }
  function copyText(v, ta) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(v).catch(function () { return legacy(v); });
    }
    return Promise.resolve(legacy(v));
  }
  function legacy(v) {
    var t = document.createElement('textarea'); t.value = v; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.focus(); t.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
    if (!ok) throw new Error('copy failed');
  }

  var ALLOWED = { A: 1, B: 1, STRONG: 1, I: 1, EM: 1, H1: 1, H2: 1, H3: 1, MARK: 1, CODE: 1, PRE: 1, P: 1, DIV: 1, BR: 1, UL: 1, OL: 1, LI: 1 };
  function walk(n) {
    Array.prototype.slice.call(n.childNodes).forEach(function (c) {
      if (c.nodeType === 1) {
        walk(c);
        if (!ALLOWED[c.tagName]) {
          if (c.tagName === 'SCRIPT' || c.tagName === 'STYLE') { n.removeChild(c); return; }
          while (c.firstChild) n.insertBefore(c.firstChild, c);
          n.removeChild(c);
        } else {
          var href = c.tagName === 'A' ? (c.getAttribute('href') || '') : '';
          Array.prototype.slice.call(c.attributes).forEach(function (a) { c.removeAttribute(a.name); });
          if (c.tagName === 'A') {
            if (/^https?:\/\//i.test(href)) { c.setAttribute('href', href); }
            else { while (c.firstChild) n.insertBefore(c.firstChild, c); n.removeChild(c); }
          }
        }
      } else if (c.nodeType !== 3) { n.removeChild(c); }
    });
  }
  function preText(p) {
    var c = p.cloneNode(true);
    Array.prototype.slice.call(c.querySelectorAll('br')).forEach(function (b) { b.parentNode.replaceChild(document.createTextNode('\n'), b); });
    return c.textContent;
  }
  function normalizePre(root) {
    Array.prototype.slice.call(root.querySelectorAll('pre')).forEach(function (p) {
      if (!p.parentNode) return;
      var t = preText(p);
      var nx = p.nextSibling;
      while (nx && ((nx.nodeType === 1 && nx.tagName === 'PRE') || (nx.nodeType === 3 && nx.nodeValue.trim() === ''))) {
        var rm = nx; nx = nx.nextSibling;
        if (rm.nodeType === 1) t += '\n' + preText(rm);
        rm.parentNode.removeChild(rm);
      }
      t = t.replace(/\n+$/, '');
      p.textContent = t;
    });
  }
  function clean(html) {
    var d = new DOMParser().parseFromString('<div>' + (html || '') + '</div>', 'text/html');
    var root = d.body.firstChild; walk(root); normalizePre(root); return root.innerHTML;
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function toMd(node) {
    var out = '';
    node.childNodes.forEach(function (c) {
      if (c.nodeType === 3) { out += c.nodeValue; return; }
      if (c.nodeType !== 1) return;
      var t = c.tagName;
      if (t === 'PRE') { out += '\n```\n' + c.textContent + '\n```\n'; return; }
      if (t === 'UL' || t === 'OL') {
        var n = 0, s = '';
        c.childNodes.forEach(function (li) {
          if (li.nodeType === 1 && li.tagName === 'LI') { n++; s += (t === 'OL' ? n + '. ' : '- ') + toMd(li).replace(/\n+$/, '') + '\n'; }
        });
        out += '\n' + s; return;
      }
      var inner = toMd(c);
      if (t === 'B' || t === 'STRONG') out += '**' + inner + '**';
      else if (t === 'I' || t === 'EM') out += '*' + inner + '*';
      else if (t === 'MARK') out += '==' + inner + '==';
      else if (t === 'A') out += '[' + inner + '](' + (c.getAttribute('href') || '') + ')';
      else if (t === 'CODE') out += '`' + inner + '`';
      else if (t === 'H1') out += '\n# ' + inner + '\n';
      else if (t === 'H2') out += '\n## ' + inner + '\n';
      else if (t === 'H3') out += '\n### ' + inner + '\n';
      else if (t === 'LI') out += '- ' + inner + '\n';
      else if (t === 'BR') out += '\n';
      else if (t === 'P' || t === 'DIV' || t === 'UL' || t === 'OL') out += inner.replace(/\n?$/, '\n');
      else out += inner;
    });
    return out;
  }
  function notesText(it) {
    var d = document.createElement('div'); d.innerHTML = clean(it.html || '');
    return toMd(d).replace(/\n{3,}/g, '\n\n').trim();
  }
  function buildEditor(it) {
    var wrap = el('div', 'edwrap');
    var tb = el('div', 'etb'); tb.setAttribute('role', 'toolbar'); tb.setAttribute('aria-label', 'Formatação das anotações de ' + it.title);
    var ed = el('div', 'ed'); ed.contentEditable = 'true'; ed.setAttribute('role', 'textbox'); ed.setAttribute('aria-multiline', 'true');
    ed.setAttribute('aria-label', 'Anotações de ' + it.title);
    ed.setAttribute('data-ph', 'Escreva com suas palavras: o que entendi, um erro que cometi, uma dúvida.');
    ed.innerHTML = it.html || '';
    var hint = el('div', 'cmeta'); hint.setAttribute('aria-live', 'polite');
    var tmr = null;
    function say(t) { hint.textContent = t; clearTimeout(tmr); tmr = setTimeout(function () { hint.textContent = ''; }, 3000); }
    function empty() { ed.setAttribute('data-empty', (ed.textContent.trim() === '' && !ed.querySelector('pre, li')) ? 'true' : 'false'); }
    function curBlock() { return (document.queryCommandValue('formatBlock') || '').toLowerCase().replace(/[<>]/g, ''); }
    function block(tag) { ed.focus(); document.execCommand('formatBlock', false, curBlock() === tag ? 'p' : tag); }
    function unwrapNode(node) {
      var parent = node.parentNode, idx = Array.prototype.indexOf.call(parent.childNodes, node);
      var kids = Array.prototype.slice.call(node.childNodes);
      kids.forEach(function (k) { parent.insertBefore(k, node); });
      parent.removeChild(node);
      var s = window.getSelection(), r = document.createRange();
      if (kids.length) { r.setStartBefore(kids[0]); r.setEndAfter(kids[kids.length - 1]); }
      else { r.setStart(parent, idx); r.collapse(true); }
      s.removeAllRanges(); s.addRange(r);
    }
    function inl(tag) {
      ed.focus();
      var sel = window.getSelection(); if (!sel.rangeCount) return;
      var r = sel.getRangeAt(0); if (!ed.contains(r.commonAncestorContainer)) return;
      var anc = r.commonAncestorContainer; if (anc.nodeType === 3) anc = anc.parentNode;
      var ex = anc.closest ? anc.closest(tag) : null;
      if (ex && ed.contains(ex)) { unwrapNode(ex); }
      else if (!sel.isCollapsed) {
        var node = document.createElement(tag);
        node.appendChild(r.extractContents());
        r.insertNode(node);
        var nr = document.createRange(); nr.selectNodeContents(node);
        sel.removeAllRanges(); sel.addRange(nr);
      } else { say('Selecione um trecho do texto primeiro.'); }
    }
    function caretOffset() {
      var s = window.getSelection(); if (!s.rangeCount) return null;
      var r = s.getRangeAt(0); if (!ed.contains(r.startContainer)) return null;
      var pre = document.createRange(); pre.selectNodeContents(ed); pre.setEnd(r.startContainer, r.startOffset);
      return pre.toString().length;
    }
    function setCaret(off) {
      var w = document.createTreeWalker(ed, NodeFilter.SHOW_TEXT), n, count = 0, s = window.getSelection(), r = document.createRange();
      while ((n = w.nextNode())) {
        var l = n.nodeValue.length;
        if (count + l >= off) { r.setStart(n, off - count); r.collapse(true); s.removeAllRanges(); s.addRange(r); return; }
        count += l;
      }
    }
    function list(cmd) {
      ed.focus();
      var s = window.getSelection(), off = (s.rangeCount && s.isCollapsed) ? caretOffset() : null;
      document.execCommand(cmd);
      if (off !== null && caretOffset() !== off) setCaret(off);
    }
    var INL = /^(B|STRONG|I|EM|MARK|CODE|A|SPAN|U|BR)$/;
    function inlineNode(n) { return n.nodeType === 3 || (n.nodeType === 1 && INL.test(n.tagName)); }
    function topOf(node, off, isEnd) {
      if (node === ed) {
        if (!ed.childNodes.length) { var d = document.createElement('div'); d.appendChild(document.createElement('br')); ed.appendChild(d); return d; }
        var i = isEnd ? Math.max(0, off - 1) : Math.min(off, ed.childNodes.length - 1);
        return ed.childNodes[i];
      }
      while (node.parentNode !== ed) node = node.parentNode;
      return node;
    }
    function textOfNodes(nodes) {
      var tmp = document.createElement('div');
      tmp.style.cssText = 'position:fixed;left:-9999px;top:0;width:600px;white-space:normal';
      nodes.forEach(function (n) { tmp.appendChild(n.cloneNode(true)); });
      document.body.appendChild(tmp);
      var t = tmp.innerText; document.body.removeChild(tmp);
      return t.replace(/\r/g, '');
    }
    function caretTo(node, atEnd) {
      var s = window.getSelection(), r = document.createRange();
      r.selectNodeContents(node); r.collapse(!atEnd); s.removeAllRanges(); s.addRange(r);
    }
    function toggleCode() {
      ed.focus();
      var s = window.getSelection(); if (!s.rangeCount) return;
      var r = s.getRangeAt(0); if (!ed.contains(r.commonAncestorContainer)) return;
      var a = r.startContainer.nodeType === 3 ? r.startContainer.parentNode : r.startContainer;
      var pre = a.closest ? a.closest('pre') : null;
      if (pre && ed.contains(pre)) {
        var lines = preText(pre).replace(/\n+$/, '').split('\n'), frag = document.createDocumentFragment(), lastDiv = null;
        lines.forEach(function (l) {
          var d = document.createElement('div');
          if (l === '') d.appendChild(document.createElement('br')); else d.textContent = l;
          frag.appendChild(d); lastDiv = d;
        });
        pre.parentNode.replaceChild(frag, pre);
        if (lastDiv) caretTo(lastDiv, true);
        return;
      }
      var first = topOf(r.startContainer, r.startOffset, false), last = topOf(r.endContainer, r.endOffset, true);
      while (inlineNode(first) && first.previousSibling && inlineNode(first.previousSibling)) first = first.previousSibling;
      while (inlineNode(last) && last.nextSibling && inlineNode(last.nextSibling)) last = last.nextSibling;
      var nodes = [], n = first;
      while (n) { nodes.push(n); if (n === last) break; n = n.nextSibling; }
      var np = document.createElement('pre');
      var text = textOfNodes(nodes).replace(/\n+$/, '');
      if (text === '') np.appendChild(document.createElement('br')); else np.textContent = text;
      ed.insertBefore(np, first);
      nodes.forEach(function (x) { if (x.parentNode === ed) ed.removeChild(x); });
      if (!np.nextSibling || np.nextSibling.nodeType !== 1 || np.nextSibling.tagName === 'PRE') {
        var d = document.createElement('div'); d.appendChild(document.createElement('br')); ed.insertBefore(d, np.nextSibling);
      }
      caretTo(np, true);
      say('Dentro do bloco, Enter duas vezes (ou Ctrl+Enter) sai do bloco.');
    }
    function exitPre(pre) {
      var t = preText(pre).replace(/\n+$/, '');
      if (t === '') { pre.textContent = ''; pre.appendChild(document.createElement('br')); } else { pre.textContent = t; }
      var nx = pre.nextSibling, d;
      if (nx && nx.nodeType === 1 && nx.tagName === 'DIV' && nx.textContent === '') d = nx;
      else { d = document.createElement('div'); d.appendChild(document.createElement('br')); pre.parentNode.insertBefore(d, pre.nextSibling); }
      var s = window.getSelection(), r = document.createRange(); r.setStart(d, 0); r.collapse(true); s.removeAllRanges(); s.addRange(r);
      save();
    }
    function preAtCaret() {
      var s = window.getSelection(); if (!s.anchorNode) return null;
      var el = s.anchorNode.nodeType === 3 ? s.anchorNode.parentNode : s.anchorNode;
      var pre = el.closest ? el.closest('pre') : null;
      return (pre && ed.contains(pre)) ? pre : null;
    }
    function inTag(tag) {
      var s = window.getSelection(); if (!s.anchorNode || !ed.contains(s.anchorNode)) return false;
      var n = s.anchorNode.nodeType === 3 ? s.anchorNode.parentNode : s.anchorNode;
      var c = n.closest ? n.closest(tag) : null; return !!(c && ed.contains(c));
    }
    var panel = el('div', 'elink'); panel.hidden = true;
    var lin = document.createElement('input'); lin.type = 'text'; lin.placeholder = 'Cole o endereço do link'; lin.setAttribute('aria-label', 'Endereço do link');
    function qbtn(t) { var b = el('button', null, t); b.type = 'button'; return b; }
    var lok = qbtn('Aplicar'), lop = qbtn('Abrir'), lrm = qbtn('Remover link'), lcx = qbtn('Cancelar');
    panel.appendChild(lin); panel.appendChild(lok); panel.appendChild(lop); panel.appendChild(lrm); panel.appendChild(lcx);
    var saved = null, exLink = null;
    function closePanel(refocus) {
      panel.hidden = true;
      if (refocus) { ed.focus(); if (saved) { var s = window.getSelection(); s.removeAllRanges(); s.addRange(saved); } }
      saved = null; exLink = null;
    }
    function openPanel() {
      var s = window.getSelection();
      if (!s.rangeCount || !ed.contains(s.getRangeAt(0).commonAncestorContainer)) { ed.focus(); s = window.getSelection(); }
      if (!s.rangeCount) return;
      var r = s.getRangeAt(0), anc = r.commonAncestorContainer; if (anc.nodeType === 3) anc = anc.parentNode;
      var ex = anc.closest ? anc.closest('a') : null; ex = (ex && ed.contains(ex)) ? ex : null;
      if (!ex && s.isCollapsed) { say('Selecione o texto que vai virar link.'); return; }
      saved = r.cloneRange(); exLink = ex;
      lin.value = ex ? (ex.getAttribute('href') || '') : '';
      lop.hidden = !ex; lrm.hidden = !ex;
      panel.hidden = false; lin.focus(); lin.select();
    }
    function applyLink() {
      var u = okUrl(lin.value);
      if (!u) { say('Endereço inválido. Exemplo: https://exemplo.com'); lin.focus(); return; }
      ed.focus();
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(saved);
      if (exLink) { exLink.setAttribute('href', u); }
      else { document.execCommand('createLink', false, u); }
      saved = null; exLink = null; panel.hidden = true;
      save(); state();
    }
    lok.addEventListener('click', applyLink);
    lin.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); applyLink(); }
      else if (e.key === 'Escape') { e.preventDefault(); closePanel(true); }
    });
    lcx.addEventListener('click', function () { closePanel(true); });
    lop.addEventListener('click', function () { var u = okUrl(lin.value); if (u) window.open(u, '_blank', 'noopener'); });
    lrm.addEventListener('click', function () {
      var node = exLink, r = saved; closePanel(false); ed.focus();
      if (node && ed.contains(node)) { unwrapNode(node); save(); state(); }
    });
    /* ---------- limpar / apagar ---------- */
    var undoSnap = null;
    function offerUndo(msg) {
      clearTimeout(tmr);
      hint.textContent = msg + ' ';
      var u = el('button', 'lrm', 'Desfazer'); u.type = 'button';
      u.addEventListener('click', function () {
        if (undoSnap === null) return;
        ed.innerHTML = undoSnap; undoSnap = null; hint.textContent = ''; save(); state();
      });
      hint.appendChild(u);
      tmr = setTimeout(function () { hint.textContent = ''; undoSnap = null; }, 10000);
    }
    function linesOf(nodes) {
      var out = [], run = [];
      function flush() { if (run.length) { out = out.concat(textOfNodes(run).replace(/\n+$/, '').split('\n')); run = []; } }
      nodes.forEach(function (n) {
        if (inlineNode(n)) { if (n.nodeType === 3 && !run.length && n.nodeValue.trim() === '') return; run.push(n); return; }
        flush();
        if (n.tagName === 'PRE') out = out.concat(preText(n).replace(/\n+$/, '').split('\n'));
        else if (n.tagName === 'UL' || n.tagName === 'OL') Array.prototype.forEach.call(n.children, function (li) { out = out.concat(linesOf([li])); });
        else out = out.concat(textOfNodes([n]).replace(/\n+$/, '').split('\n'));
      });
      flush();
      return out;
    }
    function clearFmt() {
      var s = window.getSelection(), r = null;
      if (s.rangeCount) { var g = s.getRangeAt(0); if (ed.contains(g.commonAncestorContainer) && !g.collapsed) r = g; }
      var kids = Array.prototype.slice.call(ed.childNodes);
      var hit = r ? kids.filter(function (n) { return r.intersectsNode(n); }) : kids;
      if (!hit.length || ed.textContent.trim() === '') { say('Não há texto para limpar.'); return; }
      undoSnap = ed.innerHTML;
      var frag = document.createDocumentFragment(), last = null;
      linesOf(hit).forEach(function (l) {
        var d = document.createElement('div');
        if (l.trim() === '') d.appendChild(document.createElement('br')); else d.textContent = l;
        frag.appendChild(d); last = d;
      });
      ed.insertBefore(frag, hit[hit.length - 1].nextSibling);
      hit.forEach(function (n) { ed.removeChild(n); });
      if (r && last) caretTo(last, true);
      offerUndo(r ? 'Formatação removida da seleção.' : 'Formatação removida de todo o texto. Para limpar só um trecho, selecione-o antes.');
    }
    function wipeAll() {
      if (ed.textContent.trim() === '' && !ed.querySelector('pre, li')) { say('A anotação já está vazia.'); return; }
      undoSnap = ed.innerHTML;
      ed.innerHTML = '';
      ed.focus();
      offerUndo('Anotação apagada.');
    }
    var BTN = [
      ['b', '<b>B</b>', 'Negrito (Ctrl+B)', function () { ed.focus(); document.execCommand('bold'); }, function () { return document.queryCommandState('bold'); }],
      ['|'],
      ['h1', 'H1', 'Título 1', function () { block('h1'); }, function () { return curBlock() === 'h1'; }],
      ['h2', 'H2', 'Título 2', function () { block('h2'); }, function () { return curBlock() === 'h2'; }],
      ['h3', 'H3', 'Título 3', function () { block('h3'); }, function () { return curBlock() === 'h3'; }],
      ['|'],
      ['mark', '<span class="hlsw" aria-hidden="true"></span>', 'Destacar em verde', function () { inl('mark'); }, function () { return inTag('mark'); }],
      ['code', '&lt;&gt;', 'Código no texto', function () { inl('code'); }, function () { return inTag('code') && !inTag('pre'); }],
      ['pre', '{ }', 'Bloco de código', function () { toggleCode(); }, function () { return inTag('pre'); }],
      ['|'],
      ['ul', '&bull;', 'Lista com marcadores', function () { list('insertUnorderedList'); }, function () { return document.queryCommandState('insertUnorderedList'); }],
      ['ol', '1.', 'Lista numerada', function () { list('insertOrderedList'); }, function () { return document.queryCommandState('insertOrderedList'); }],
      ['|'],
      ['link', '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg>', 'Link', function () { openPanel(); }, function () { return inTag('a'); }],
      ['sp'],
      ['clr', 'Limpar', 'Limpar formatação: da seleção, ou de todo o texto se nada estiver selecionado', function () { clearFmt(); }, function () { return false; }, 'quiet'],
      ['wipe', 'Apagar', 'Apagar todo o texto desta anotação', function () { wipeAll(); }, function () { return false; }, 'quiet']
    ];
    var btns = [];
    BTN.forEach(function (d) {
      if (d[0] === '|') { tb.appendChild(el('span', 'sep')); return; }
      if (d[0] === 'sp') { tb.appendChild(el('span', 'grow')); return; }
      var b = document.createElement('button'); b.type = 'button'; b.innerHTML = d[1];
      b.setAttribute('aria-label', d[2]); b.title = d[2]; b.setAttribute('aria-pressed', 'false'); if (d[5]) b.className = d[5];
      b.addEventListener('mousedown', function (e) { e.preventDefault(); });
      b.addEventListener('click', function () { d[3](); save(); state(); });
      tb.appendChild(b); btns.push([b, d[4]]);
    });
    function state() { btns.forEach(function (x) { var on = false; try { on = !!x[1](); } catch (e) {} x[0].setAttribute('aria-pressed', on ? 'true' : 'false'); }); }
    function save() { it.html = clean(ed.innerHTML); persist(); empty(); }
    ed.addEventListener('focus', function () { try { document.execCommand('styleWithCSS', false, false); } catch (e) {} state(); });
    ed.addEventListener('input', function (e) {
      if (e.inputType === 'insertParagraph') {
        var s = window.getSelection();
        if (s.anchorNode) {
          var n = s.anchorNode.nodeType === 3 ? s.anchorNode.parentNode : s.anchorNode;
          ['code', 'mark'].forEach(function (t) {
            var c = n.closest ? n.closest(t) : null;
            if (c && ed.contains(c) && c.textContent === '') unwrapNode(c);
          });
        }
      }
      save();
    });
    ed.addEventListener('keyup', state); ed.addEventListener('mouseup', state);
    /* ---------- colar mantendo a estrutura ---------- */
    function codeBlock(t) { t = t.replace(/\r/g, '').replace(/\n+$/, ''); return '<pre>' + (esc(t) || '<br>') + '</pre>'; }
    function rawText(n) {
      if (n.nodeType === 3) return n.nodeValue;
      if (n.nodeType !== 1) return '';
      var tg = n.tagName.toUpperCase();
      if (/^(BUTTON|SVG|STYLE|SCRIPT)$/.test(tg)) return '';
      if (tg === 'BR') return '\n';
      var s = '';
      n.childNodes.forEach(function (c) { s += rawText(c); });
      if (/^(DIV|P|LI|TR)$/.test(tg) && !/\n$/.test(s)) s += '\n';
      return s;
    }
    function pasteHtmlOf(src) {
      var doc = new DOMParser().parseFromString(src, 'text/html');
      function kids(n) { var s = ''; n.childNodes.forEach(function (c) { s += conv(c); }); return s; }
      function blockWrap(inner) {
        if (/<(div|h[1-3]|ul|ol|pre|li)[ >]/.test(inner)) return inner;
        if (inner === '<br>') return '<div><br></div>';
        return inner.replace(/^(\s|<br>)+|(\s|<br>)+$/g, '') ? '<div>' + inner.trim() + '</div>' : '';
      }
      function conv(n) {
        if (n.nodeType === 3) return esc(n.nodeValue.replace(/[ \t\r\n\u00a0]+/g, ' '));
        if (n.nodeType !== 1) return '';
        var t = n.tagName.toUpperCase(), st = (n.getAttribute('style') || '').toLowerCase(), inner, h;
        if (/^(SCRIPT|STYLE|META|LINK|TITLE|HEAD|NOSCRIPT|SVG|BUTTON|IMG|INPUT|SELECT|TEXTAREA|CANVAS|IFRAME)$/.test(t)) return '';
        if (t === 'BR') return '<br>';
        if (t === 'PRE') { var pt = rawText(n).replace(/\n+$/, ''); return '<pre>' + (esc(pt) || '<br>') + '</pre>'; }
        if (t === 'TABLE' || t === 'THEAD' || t === 'TBODY' || t === 'TFOOT') return kids(n);
        if (t === 'TR') {
          var cells = [];
          Array.prototype.forEach.call(n.children, function (c) { cells.push(kids(c).trim()); });
          return cells.join('') ? '<div>' + cells.join(' | ') + '</div>' : '';
        }
        inner = kids(n);
        if (/^H[1-6]$/.test(t)) { var lv = Math.min(+t.charAt(1), 3); inner = inner.trim(); return inner ? '<h' + lv + '>' + inner + '</h' + lv + '>' : ''; }
        if (t === 'UL' || t === 'OL') { var tl = t.toLowerCase(); return inner.indexOf('<li>') === -1 ? '' : '<' + tl + '>' + inner.trim() + '</' + tl + '>'; }
        if (t === 'LI') { inner = inner.replace(/<\/div><div>/g, '<br>').replace(/<\/?div>/g, '').trim(); return inner ? '<li>' + inner + '</li>' : ''; }
        if (t === 'B' || t === 'STRONG') return (/font-weight:\s*(normal|400)/.test(st) || !inner.trim()) ? inner : '<b>' + inner + '</b>';
        if (t === 'I' || t === 'EM' || t === 'CITE') return (/font-style:\s*normal/.test(st) || !inner.trim()) ? inner : '<i>' + inner + '</i>';
        if (/^(CODE|KBD|SAMP|TT)$/.test(t)) return inner.trim() ? '<code>' + inner + '</code>' : inner;
        if (t === 'MARK') return inner.trim() ? '<mark>' + inner + '</mark>' : inner;
        if (t === 'A') { h = n.getAttribute('href') || ''; return (/^https?:\/\//i.test(h) && inner.trim()) ? '<a href="' + esc(h).replace(/"/g, '&quot;') + '">' + inner + '</a>' : inner; }
        if (t === 'SPAN' || t === 'FONT') {
          if (!inner.trim()) return inner;
          if (/font-weight:\s*(bold|[6-9]00)/.test(st)) inner = '<b>' + inner + '</b>';
          if (/font-style:\s*italic/.test(st)) inner = '<i>' + inner + '</i>';
          return inner;
        }
        if (/^(P|DIV|BLOCKQUOTE|SECTION|ARTICLE|FIGURE|FIGCAPTION|HEADER|FOOTER|DT|DD|CENTER|ASIDE|MAIN|DETAILS|SUMMARY)$/.test(t)) return blockWrap(inner);
        return inner;
      }
      return kids(doc.body).replace(/(<\/(?:div|h[1-3]|ul|ol|li|pre)>|<(?:ul|ol)>)\s+(?=<(?:div|h[1-3]|ul|ol|li|pre)[ >])/g, '$1').trim();
    }
    function inlineMd(t) {
      var hold = [];
      function put(h) { hold.push(h); return '\u0000' + (hold.length - 1) + '\u0000'; }
      function aTag(u, label) { return '<a href="' + esc(u).replace(/"/g, '&quot;') + '">' + esc(label) + '</a>'; }
      t = t.replace(/`([^`\n]+)`/g, function (m, c) { return put('<code>' + esc(c) + '</code>'); });
      t = t.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, function (m, a, u) { return put(aTag(u, a)); });
      t = t.replace(/https?:\/\/[^\s<>"]+/g, function (u) {
        var tail = '', m = u.match(/[.,;:!?)\]]+$/);
        if (m) { tail = m[0]; u = u.slice(0, u.length - tail.length); }
        return put(aTag(u, u)) + tail;
      });
      t = esc(t)
        .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
        .replace(/(^|[^=])==(?=\S)([^=\n]*?\S)==(?!=)/g, '$1<mark>$2</mark>')
        .replace(/(^|[^*\w])\*([^*\s][^*\n]*?)\*(?![*\w])/g, '$1<i>$2</i>');
      return t.replace(/\u0000(\d+)\u0000/g, function (m, i) { return hold[+i]; });
    }
    function isBlk(s) { return /^\s*```/.test(s) || /^\s{0,3}#{1,6}\s+\S/.test(s) || /^\s*[-*•–]\s+\S/.test(s) || /^\s*\d+[.)]\s+\S/.test(s); }
    function mdToHtml(text) {
      var lines = text.replace(/\r/g, '').split('\n'), out = [], list = null, i = 0, m;
      function endList() { if (list) { out.push('</' + list + '>'); list = null; } }
      function item(type, body) {
        if (list !== type) { endList(); list = type; out.push('<' + type + '>'); }
        out.push('<li>' + inlineMd(body) + '</li>');
      }
      while (i < lines.length) {
        var l = lines[i];
        if (/^\s*```/.test(l)) {
          var buf = []; i++;
          while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
          i++; endList();
          out.push('<pre>' + (esc(buf.join('\n').replace(/\n+$/, '')) || '<br>') + '</pre>');
          continue;
        }
        if (l.trim() === '') {
          endList();
          var j = i + 1; while (j < lines.length && lines[j].trim() === '') j++;
          var lastO = out[out.length - 1];
          if (lastO && /^<div>(?!<br>)/.test(lastO) && j < lines.length && !isBlk(lines[j])) out.push('<div><br></div>');
          i = j; continue;
        }
        if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) { endList(); i++; continue; }
        if ((m = /^\s{0,3}(#{1,6})\s+(.+?)\s*$/.exec(l))) { endList(); var lv = Math.min(m[1].length, 3); out.push('<h' + lv + '>' + inlineMd(m[2]) + '</h' + lv + '>'); i++; continue; }
        if ((m = /^\s*[-*•–]\s+(.*)$/.exec(l))) { item('ul', m[1]); i++; continue; }
        if ((m = /^\s*\d+[.)]\s+(.*)$/.exec(l))) { item('ol', m[1]); i++; continue; }
        endList();
        out.push('<div>' + inlineMd(l.replace(/^\s*>\s?/, '').trim()) + '</div>');
        i++;
      }
      endList();
      return out.join('');
    }
    function looksLikeCode(t) {
      var ls = t.replace(/\n+$/, '').split('\n').filter(function (x) { return x.trim() !== ''; });
      if (!ls.length) return false;
      if (ls.length === 1) return /^\s*(const|let|var|function|import|export|class)\s/.test(ls[0]) || (/;\s*$/.test(ls[0]) && /[=(]/.test(ls[0]));
      var re = /[;{]\s*$|^\s*[})\]]|^\s*(\/\/|\/\*|\*\/)|=>|^\s*(if|for|while|switch|catch)\s*\(|^\s*else\b|^\s*(const|let|var)\s+[\w$[{]|^\s*(async\s+)?function\b|^\s*class\s+\w|^\s*return\b|^\s*(import|export)\s|\b(console|document|window)\.\w+|^\s*<\/?[a-z][\w-]*(\s[^>]*)?>\s*$/;
      return ls.filter(function (x) { return re.test(x); }).length / ls.length >= 0.6;
    }
    function fromText(t) {
      t = t.replace(/\r/g, '');
      var fence = /^\s*```/m.test(t), md = /^\s{0,3}#{1,6}\s+\S|^\s*[-*•–]\s+\S|^\s*\d+[.)]\s+\S/m.test(t);
      if (!fence && !md && looksLikeCode(t)) return codeBlock(t);
      var tok = /\*\*[^*\n]+\*\*|`[^`\n]+`|==\S|\[[^\]\n]+\]\(https?:|https?:\/\//.test(t);
      if (!fence && !md && !tok && t.indexOf('\n') === -1) return '';
      return mdToHtml(t);
    }
    ed.addEventListener('paste', function (e) {
      e.preventDefault();
      var cd = e.clipboardData || window.clipboardData; if (!cd) return;
      var txt = cd.getData('text/plain') || '', html = cd.getData('text/html') || '';
      if (preAtCaret()) {
        txt.replace(/\r/g, '').split('\n').forEach(function (l, i) {
          if (i > 0) document.execCommand('insertLineBreak');
          if (l) document.execCommand('insertText', false, l);
        });
        return;
      }
      var types = Array.prototype.slice.call(cd.types || []), out = '';
      if (txt && types.indexOf('vscode-editor-data') !== -1) out = codeBlock(txt);
      else if (html) { var h = pasteHtmlOf(html); if (/<(h[1-3]|ul|ol|pre|b|i|code|a|mark)[ >]/.test(h)) out = h; }
      if (!out && txt) out = fromText(txt);
      if (out) document.execCommand('insertHTML', false, out);
      else if (txt) document.execCommand('insertText', false, txt);
    });
    ed.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var pre = preAtCaret(); if (!pre) return;
      e.preventDefault();
      var s = window.getSelection();
      if (e.ctrlKey || e.metaKey) { exitPre(pre); return; }
      if (s.isCollapsed) {
        var t = preText(pre), rr = document.createRange();
        rr.selectNodeContents(pre); rr.setEnd(s.anchorNode, s.anchorOffset);
        var off = rr.toString().length;
        if (/\n\n$/.test(t) && off >= t.length - 1) { exitPre(pre); return; }
      }
      document.execCommand('insertLineBreak');
    });
    ed.addEventListener('drop', function (e) { e.preventDefault(); });
    ed.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && ed.contains(a) && (e.ctrlKey || e.metaKey)) { e.preventDefault(); window.open(a.getAttribute('href'), '_blank', 'noopener'); }
    });
    ed.addEventListener('mouseover', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && ed.contains(a) && !a.title) a.title = 'Ctrl+clique para abrir\n' + a.getAttribute('href');
    });
    empty();
    var stick = el('div', 'estick'); stick.appendChild(tb); stick.appendChild(panel);
    var box = el('div', 'edbox'); box.appendChild(stick); box.appendChild(ed);
    wrap.appendChild(box); wrap.appendChild(hint);
    return wrap;
  }
  /* ---------- dados ---------- */
  var SK2 = 'mapa-estudos-caderno-v2', SK1 = 'mapa-estudos-caderno-v1', UIK = 'mapa-estudos-ui-v1';
  var STATUS = ['Não iniciado', 'Estudando', 'Concluído'];
  var LEGACY_TITLE = 'JavaScript: variáveis, tipos, condicionais e laços';
  /* links iniciais das estações da etapa 1 (aplicados uma única vez; o que você remover não volta) */
  var SEED_V = 1;
  var SEEDS = {
    'JavaScript: funções, arrays e objetos': [
      ['Curso em Vídeo: Variáveis compostas (aula 15)', 'https://www.youtube.com/watch?v=XdkW62tkAgU'],
      ['Curso em Vídeo: Funções (aula 16)', 'https://www.youtube.com/watch?v=mc3TKp2XzhI'],
      ['javascript.info: Functions', 'https://javascript.info/function-basics'],
      ['javascript.info: Array methods (map, filter, reduce)', 'https://javascript.info/array-methods'],
      ['javascript.info: Objects', 'https://javascript.info/object'],
      ['MDN: Coleções indexadas (arrays)', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Indexed_collections'],
      ['MDN: Trabalhando com objetos', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Working_with_objects'],
      ['Exercism: trilha de JavaScript', 'https://exercism.org/tracks/javascript']
    ],
    'JavaScript: DOM e eventos': [
      ['Curso em Vídeo: Introdução ao DOM (aula 9)', 'https://www.youtube.com/watch?v=WWZX8RWLxIk'],
      ['Curso em Vídeo: Eventos DOM (aula 10)', 'https://www.youtube.com/watch?v=wWnBB-mZIvY'],
      ['javascript.info: Document', 'https://javascript.info/document'],
      ['javascript.info: Searching: getElement*, querySelector*', 'https://javascript.info/searching-elements-dom'],
      ['javascript.info: Introduction to browser events', 'https://javascript.info/introduction-browser-events'],
      ['MDN: Manipulando documentos (DOM)', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/DOM_scripting'],
      ['MDN: Eventos', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Events']
    ],
    'JavaScript: async/await, fetch e JSON': [
      ['javascript.info: Promise', 'https://javascript.info/promise-basics'],
      ['javascript.info: Async/await', 'https://javascript.info/async-await'],
      ['javascript.info: Fetch', 'https://javascript.info/fetch'],
      ['javascript.info: JSON methods', 'https://javascript.info/json'],
      ['MDN: Usando Promises', 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises'],
      ['MDN: Usando a Fetch API', 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch'],
      ['MDN: Trabalhando com JSON', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/JSON']
    ],
    'Git no dia a dia: commit, branch, merge e push': [
      ['Pro Git (português): Fundamentos do Git', 'https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Obtendo-um-Reposit%c3%b3rio-Git'],
      ['Pro Git (português): Branches em poucas palavras', 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Branches-em-Poucas-Palavras'],
      ['Pro Git (português): Branching e merging básicos', 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Ramifica%c3%a7%c3%a3o-Branching-e-Mesclagem-Merging-B%c3%a1sicas'],
      ['Pro Git (português): Repositórios remotos (push)', 'https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Trabalhando-com-Reposit%c3%b3rios-Remotos'],
      ['Learn Git Branching (prática visual, em português)', 'https://learngitbranching.js.org/?locale=pt_BR'],
      ['GitHub Skills: cursos práticos gratuitos', 'https://skills.github.com/'],
      ['GitHub Docs: Hello World', 'https://docs.github.com/pt/get-started/using-github/hello-world']
    ],
    'Revisar HTML e CSS com Flexbox, Grid e layout responsivo': [
      ['MDN: Estruturando conteúdo com HTML', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content'],
      ['MDN: Flexbox', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Flexbox'],
      ['MDN: Conceitos básicos de CSS Grid', 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Grid_layout/Basic_concepts'],
      ['MDN: Design responsivo', 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Responsive_Design'],
      ['Flexbox Froggy (jogo para praticar)', 'https://flexboxfroggy.com/#pt-br'],
      ['Grid Garden (jogo para praticar)', 'https://cssgridgarden.com/#pt-br']
    ],
    'Criar o Projeto 1: app que consome uma API pública': [
      ['JSONPlaceholder: API de teste', 'https://jsonplaceholder.typicode.com/'],
      ['Open-Meteo: API de clima', 'https://open-meteo.com/en/docs'],
      ['PokéAPI', 'https://pokeapi.co/'],
      ['public-apis: lista de APIs públicas', 'https://github.com/public-apis/public-apis'],
      ['MDN: Usando a Fetch API', 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch']
    ],
    'Publicar o Projeto 1 no ar (Vercel ou GitHub Pages)': [
      ['Vercel: primeiros passos', 'https://vercel.com/docs/getting-started-with-vercel'],
      ['Vercel: deployments', 'https://vercel.com/docs/deployments'],
      ['GitHub Docs: criar um site no GitHub Pages', 'https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site']
    ],
    'Escrever o README do Projeto 1 em inglês, com prints': [
      ['Make a README: guia de como escrever', 'https://www.makeareadme.com/'],
      ['GitHub Docs: sobre READMEs', 'https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes'],
      ['GitHub Docs: sintaxe de formatação (inclui imagens)', 'https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax']
    ],
    'Ler documentação técnica em inglês (MDN) por 20 minutos por dia': [
      ['MDN: JavaScript (em inglês)', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
      ['MDN: JavaScript Reference (em inglês)', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference'],
      ['MDN: Glossary (termos técnicos em inglês)', 'https://developer.mozilla.org/en-US/docs/Glossary'],
      ['javascript.info (em inglês)', 'https://javascript.info/']
    ],
    'Praticar SQL com JOIN, INSERT e UPDATE em um banco real': [
      ['SQLBolt: Queries with JOINs', 'https://sqlbolt.com/lesson/select_queries_with_joins'],
      ['SQLBolt: Inserting rows', 'https://sqlbolt.com/lesson/inserting_rows'],
      ['SQLBolt: Updating rows', 'https://sqlbolt.com/lesson/updating_rows'],
      ['PostgreSQL Tutorial', 'https://neon.com/postgresql/tutorial'],
      ['SQLite Tutorial', 'https://www.sqlitetutorial.net/']
    ],
    'Entender APIs REST: GET, POST, PUT, DELETE e códigos de status': [
      ['MDN: Métodos de requisição HTTP', 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods'],
      ['MDN: Códigos de status HTTP', 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status'],
      ['MDN: Visão geral do HTTP', 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview'],
      ['REST API Tutorial', 'https://restfulapi.net/'],
      ['JSONPlaceholder: guia (GET, POST, PUT, DELETE)', 'https://jsonplaceholder.typicode.com/#guide']
    ],
    'Aprender o básico de teste de software: casos de teste, relato de bug e Jira': [
      ['Atlassian: guia de teste de software', 'https://www.atlassian.com/continuous-delivery/software-testing'],
      ['Atlassian: Jira, o básico', 'https://www.atlassian.com/software/jira/guides/getting-started/basics'],
      ['Atlassian: Jira, visão geral de issues', 'https://www.atlassian.com/software/jira/guides/issues/overview'],
      ['ISTQB: glossário de termos de teste', 'https://glossary.istqb.org/']
    ],
    'Testar uma API pública no Postman': [
      ['Postman: primeiros passos (quick start)', 'https://learning.postman.com/docs/getting-started/quick-start/'],
      ['Postman Learning Center', 'https://learning.postman.com/'],
      ['JSONPlaceholder: API para testar', 'https://jsonplaceholder.typicode.com/'],
      ['PokéAPI: outra API para testar', 'https://pokeapi.co/']
    ]
  };
  var S = [], DB = { cards: {} }, UI = { si: 1, tis: {} };
  var pillsEl, stageEl, rail, panel, headEl, cardsEl, barI, progTxt;

  /* ---------- datas ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayIso() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmt(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : ''; }
  function fmtS(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? m[3] + '/' + m[2] + '/' + m[1].slice(2) : ''; }
  function brToIso(s) {
    var m = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(s || ''); if (!m) return '';
    var d = +m[1], mo = +m[2], y = +m[3]; if (mo < 1 || mo > 12 || d < 1 || d > 31) return '';
    return y + '-' + pad(mo) + '-' + pad(d);
  }
  function span(a, b) {
    if (!a || !b) return 0;
    var A = Date.parse(a + 'T00:00:00Z'), B = Date.parse(b + 'T00:00:00Z');
    if (isNaN(A) || isNaN(B) || B < A) return 0;
    return Math.round((B - A) / 864e5) + 1;
  }
  function daysTxt(n) { return n === 1 ? '1 dia' : n + ' dias'; }
  function plain(h) { return new DOMParser().parseFromString(h || '', 'text/html').body.textContent.trim(); }

  /* ---------- armazenamento ---------- */
  function persist() { try { localStorage.setItem(SK2, JSON.stringify(DB)); } catch (e) {} }
  function saveUI() { try { localStorage.setItem(UIK, JSON.stringify(UI)); } catch (e) {} }
  function isoOk(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || '') ? s : ''; }
  function norm(c, i) {
    c = (c && typeof c === 'object') ? c : {};
    var links = [];
    (Array.isArray(c.links) ? c.links : []).forEach(function (l) {
      var u = l && typeof l.u === 'string' ? okUrl(l.u) : null;
      if (u) links.push({ t: String(l.t || u), u: u });
    });
    return {
      id: String(c.id || ('x' + Date.now() + i)), title: String(c.title || 'Tópico'),
      status: STATUS.indexOf(c.status) >= 0 ? c.status : STATUS[0],
      start: isoOk(c.start), end: isoOk(c.end), links: links,
      html: clean(typeof c.html === 'string' ? c.html : '')
    };
  }
  function legacyHtml(n) {
    return (n || '').trim() === '' ? '' : n.split('\n').map(function (l) { return '<div>' + (l === '' ? '<br>' : esc(l)) + '</div>'; }).join('');
  }
  function legacyKey() {
    for (var si = 0; si < S.length; si++) for (var ti = 0; ti < S[si].tasks.length; ti++) if (S[si].tasks[ti][0] === LEGACY_TITLE) return si + '-' + ti;
    return '1-0';
  }
  function defaults(task) {
    if (task[0] === LEGACY_TITLE) {
      return TOPICS.map(function (tp, i) { return norm({ id: tp.id, title: tp.t, links: tp.res.map(function (r) { return { t: r[0], u: r[1] }; }) }, i); });
    }
    return [norm({ id: 'main', title: task[0] }, 0)];
  }
  function load() {
    var raw = null;
    try { raw = JSON.parse(localStorage.getItem(SK2) || 'null'); } catch (e) { raw = null; }
    if (raw && raw.cards && typeof raw.cards === 'object') {
      Object.keys(raw.cards).forEach(function (k) { if (Array.isArray(raw.cards[k])) DB.cards[k] = raw.cards[k].map(norm); });
      DB.seed = +raw.seed || 0;
      return;
    }
    var old = null;
    try { old = JSON.parse(localStorage.getItem(SK1) || 'null'); } catch (e) { old = null; }
    if (Array.isArray(old) && old.length) {
      DB.cards[legacyKey()] = old.map(function (o, i) {
        o = o || {};
        var c = norm({ id: o.id, title: o.title, status: o.status, links: o.links, html: typeof o.html === 'string' ? o.html : legacyHtml(o.notes) }, i);
        var d = brToIso(o.date);
        if (d) { if (c.status === STATUS[2]) c.end = d; else if (c.status === STATUS[1]) c.start = d; }
        return c;
      });
      persist();
    }
  }
  function seedLinks() {
    if ((DB.seed || 0) >= SEED_V) return;
    S.forEach(function (st, si) {
      st.tasks.forEach(function (t, ti) {
        var sd = SEEDS[t[0]]; if (!sd) return;
        var c = cardsOf(si, ti)[0], have = {};
        c.links.forEach(function (l) { have[l.u] = 1; });
        sd.forEach(function (r) {
          var u = okUrl(r[1]);
          if (u && !have[u]) { c.links.push({ t: r[0], u: u }); have[u] = 1; }
        });
      });
    });
    DB.seed = SEED_V; persist();
  }
  function cardsOf(si, ti) {
    var k = si + '-' + ti, arr = DB.cards[k];
    if (!Array.isArray(arr) || !arr.length) arr = DB.cards[k] = defaults(S[si].tasks[ti]);
    return arr;
  }
  function summary(si, ti) {
    var cs = cardsOf(si, ti);
    var n2 = cs.filter(function (c) { return c.status === STATUS[2]; }).length;
    var n1 = cs.filter(function (c) { return c.status === STATUS[1]; }).length;
    var st = n2 === cs.length ? 2 : ((n1 + n2) > 0 ? 1 : 0);
    var starts = cs.map(function (c) { return c.start; }).filter(Boolean).sort();
    var ends = cs.map(function (c) { return c.end; }).filter(Boolean).sort();
    return { st: st, start: starts[0] || '', end: (st === 2 && ends.length) ? ends[ends.length - 1] : '' };
  }
  function stageDone(si) { var n = 0; S[si].tasks.forEach(function (t, ti) { if (summary(si, ti).st === 2) n++; }); return n; }
  function curTi(si) {
    var n = S[si].tasks.length, t = UI.tis[si];
    if (typeof t === 'number' && t >= 0 && t < n) return t;
    for (var i = 0; i < n; i++) if (summary(si, i).st !== 2) return i;
    return 0;
  }

  /* ---------- texto para copiar ---------- */
  function hasData(c) { return c.status !== STATUS[0] || c.start || c.end || notesText(c) !== ''; }
  function cardLines(c, showTitle) {
    var o = [];
    if (showTitle) o.push('#### ' + c.title);
    var d = [c.status];
    if (c.start) d.push('início ' + fmt(c.start));
    if (c.end) d.push('fim ' + fmt(c.end) + (span(c.start, c.end) ? ' (' + daysTxt(span(c.start, c.end)) + ')' : ''));
    o.push('Status: ' + d.join(' · '));
    if (c.links.length) { o.push('Links:'); c.links.forEach(function (l) { o.push('- ' + l.t + ': ' + l.u); }); }
    var nt = notesText(c); if (nt) { o.push('Anotações:'); o.push(nt); }
    return o;
  }
  function taskText(si, ti, onlyActive) {
    var cs = cardsOf(si, ti);
    if (onlyActive && !cs.some(hasData)) return [];
    var o = ['### ' + S[si].tasks[ti][0]];
    cs.forEach(function (c) { o = o.concat(cardLines(c, cs.length > 1)); o.push(''); });
    return o;
  }
  function stageText(si, onlyActive) {
    var o = [];
    S[si].tasks.forEach(function (t, ti) { o = o.concat(taskText(si, ti, onlyActive)); });
    return o.length ? ['## Etapa ' + si + ': ' + S[si].name + ' (' + S[si].weeks + ')', ''].concat(o) : [];
  }
  function allText() {
    var o = ['# CADERNO DE ESTUDOS', ''];
    S.forEach(function (s, si) { o = o.concat(stageText(si, true)); });
    return o.join('\n');
  }
  function copyBtn(label, getText) {
    var b = el('button', 'cbtn ghost', label); b.type = 'button';
    b.addEventListener('click', function () {
      Promise.resolve().then(function () { return copyText(getText()); }).then(function () {
        b.textContent = 'Copiado'; b.classList.add('ok');
        setTimeout(function () { b.textContent = label; b.classList.remove('ok'); }, 1800);
      }).catch(function () {
        b.textContent = 'Não consegui copiar';
        setTimeout(function () { b.textContent = label; }, 2200);
      });
    });
    return b;
  }

  /* ---------- desenho ---------- */
  function meta() { drawPills(); drawProg(); drawRail(); drawHead(); }
  function drawPills() {
    pillsEl.textContent = '';
    S.forEach(function (s, si) {
      var b = el('button'); b.type = 'button'; b.style.setProperty('--sc', 'var(' + s.var + ')');
      if (si === UI.si) b.setAttribute('aria-current', 'true');
      b.appendChild(el('b', null, String(si))); b.appendChild(el('span', null, s.name));
      b.appendChild(el('small', null, stageDone(si) + '/' + s.tasks.length));
      b.addEventListener('click', function () { selectStage(si); });
      pillsEl.appendChild(b);
    });
  }
  function drawProg() {
    var si = UI.si, tot = S[si].tasks.length, d = stageDone(si);
    barI.style.width = Math.round(d / tot * 100) + '%';
    progTxt.textContent = d + ' de ' + tot + ' estações concluídas nesta etapa';
  }
  function railSub(sm) {
    if (sm.st === 0) return 'Não iniciado';
    if (sm.start && sm.end) return fmtS(sm.start) + ' a ' + fmtS(sm.end);
    if (sm.start) return STATUS[sm.st] + ' desde ' + fmtS(sm.start);
    return STATUS[sm.st];
  }
  function drawRail() {
    var si = UI.si, cur = curTi(si);
    rail.textContent = '';
    S[si].tasks.forEach(function (t, ti) {
      var sm = summary(si, ti);
      var b = el('button', 'trow'); b.type = 'button'; b.id = 'est-t-' + si + '-' + ti;
      b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'estPanel');
      b.setAttribute('aria-selected', ti === cur ? 'true' : 'false'); b.tabIndex = ti === cur ? 0 : -1;
      b.appendChild(el('i', 'sdot s' + sm.st));
      var tt = el('span', 'tt'), tn = el('span', 'tn');
      tn.appendChild(el('span', 'tnum', String(ti + 1))); tn.appendChild(document.createTextNode(t[0]));
      tt.appendChild(tn); tt.appendChild(el('small', null, railSub(sm)));
      b.appendChild(tt);
      b.addEventListener('click', function () { selectTask(ti, false); });
      rail.appendChild(b);
    });
    panel.setAttribute('aria-labelledby', 'est-t-' + si + '-' + cur);
  }
  function drawHead() {
    var si = UI.si, ti = curTi(si), t = S[si].tasks[ti], sm = summary(si, ti);
    headEl.textContent = '';
    headEl.appendChild(el('span', 'cnum', 'Estação ' + (ti + 1) + ' de ' + S[si].tasks.length));
    headEl.appendChild(el('h3', 'ctitle', t[0]));
    var hint = plain(t[1]); if (hint) headEl.appendChild(el('p', 'cthint', hint));
    var chips = el('div', 'cchips');
    function chip(l, v, cls) {
      var c = el('span', 'cchip' + (cls ? ' ' + cls : '')); c.appendChild(el('b', null, l));
      c.appendChild(document.createTextNode(' ' + v)); chips.appendChild(c);
    }
    chip('Status', STATUS[sm.st], 'st' + sm.st);
    chip('Início', sm.start ? fmt(sm.start) : 'não registrado');
    chip('Fim', sm.end ? fmt(sm.end) : (sm.st === 2 ? 'não registrado' : 'em aberto'));
    var d = span(sm.start, sm.end); if (d) chip('Duração', daysTxt(d));
    headEl.appendChild(chips);
    var act = el('div', 'cact');
    act.appendChild(copyBtn('Copiar este caderno', function () { return ['# CADERNO DE ESTUDOS', ''].concat(taskText(si, ti, false)).join('\n'); }));
    var a = link('Ver no mapa', '#etapa-' + si, 'mchip'); a.removeAttribute('target'); a.removeAttribute('rel');
    act.appendChild(a);
    headEl.appendChild(act);
  }
  function buildCard(si, ti, c, multi) {
    var card = el('article', 'copycard ecard');
    var head = el('header');
    if (multi) head.appendChild(el('h4', null, c.title));
    var sel = document.createElement('select'); sel.className = 'esel'; sel.setAttribute('aria-label', 'Status de ' + c.title);
    STATUS.forEach(function (s) { var o = document.createElement('option'); o.value = s; o.textContent = s; if (s === c.status) o.selected = true; sel.appendChild(o); });
    head.appendChild(sel); card.appendChild(head);

    /* datas de início e fim */
    var dr = el('div', 'edates');
    var note = el('span', 'edur'); note.setAttribute('aria-live', 'polite');
    function dfld(label, key) {
      var l = el('label', 'dfld'); l.appendChild(el('span', null, label));
      var i = document.createElement('input'); i.type = 'date'; i.value = c[key];
      i.addEventListener('change', function () { c[key] = isoOk(i.value); persist(); check(); meta(); });
      l.appendChild(i); dr.appendChild(l); return i;
    }
    var iS = dfld('Início do estudo', 'start'), iE = dfld('Fim do estudo', 'end');
    dr.appendChild(note);
    function check() {
      var bad = !!(c.start && c.end && c.end < c.start);
      iE.setAttribute('aria-invalid', bad ? 'true' : 'false');
      note.className = 'edur' + (bad ? ' ewarn' : '');
      if (bad) note.textContent = 'A data de fim é anterior à de início.';
      else { var d = span(c.start, c.end); note.textContent = d ? 'Duração: ' + daysTxt(d) : ''; }
    }
    sel.addEventListener('change', function () {
      var prev = c.status, t = todayIso(); c.status = sel.value;
      if (c.status === STATUS[0]) { c.start = ''; c.end = ''; }
      else {
        if (!c.start) c.start = t;
        if (c.status === STATUS[2] && !c.end) c.end = t;
        if (prev === STATUS[2] && c.status !== STATUS[2]) c.end = '';
      }
      iS.value = c.start; iE.value = c.end; persist(); check(); meta();
    });
    check(); card.appendChild(dr);

    /* roteiro das sessões originais */
    var tp = TOPICS.filter(function (x) { return x.id === c.id; })[0];
    if (tp && S[si].tasks[ti][0] === LEGACY_TITLE) {
      var dt = el('details', 'eroteiro'); dt.appendChild(el('summary', null, 'Roteiro desta sessão'));
      [['Estudar', tp.est], ['Pratique', tp.pr], ['Pronto quando', tp.ok]].forEach(function (p) {
        var d = el('div'); d.appendChild(el('div', 'lbl', p[0])); d.appendChild(el('div', 'val', p[1])); dt.appendChild(d);
      });
      card.appendChild(dt);
    }

    /* links */
    card.appendChild(el('div', 'lbl', 'Links que usei'));
    var ul = el('ul', 'llist');
    function drawLinks() {
      ul.textContent = '';
      if (!c.links.length) ul.appendChild(el('li', 'cmeta', 'Nenhum link ainda.'));
      c.links.forEach(function (l, li) {
        var row = el('li'); row.appendChild(link(l.t, l.u));
        var rm = el('button', 'lrm', 'Remover'); rm.type = 'button'; rm.setAttribute('aria-label', 'Remover o link ' + l.t);
        rm.addEventListener('click', function () { c.links.splice(li, 1); persist(); drawLinks(); });
        row.appendChild(rm); ul.appendChild(row);
      });
    }
    drawLinks(); card.appendChild(ul);
    var add = el('div', 'ladd');
    var ti2 = document.createElement('input'); ti2.type = 'text'; ti2.placeholder = 'Nome do link (opcional)'; ti2.setAttribute('aria-label', 'Nome do novo link');
    var ui = document.createElement('input'); ui.type = 'text'; ui.placeholder = 'Cole o endereço'; ui.setAttribute('aria-label', 'Endereço do novo link');
    var ab = el('button', 'cbtn ghost', 'Adicionar'); ab.type = 'button';
    function doAdd() {
      var u = okUrl(ui.value);
      if (!u) { ui.setCustomValidity('Endereço inválido'); ui.reportValidity(); ui.setCustomValidity(''); return; }
      var name = ti2.value.trim(); if (!name) { try { name = new URL(u).hostname.replace(/^www\./, ''); } catch (e) { name = u; } }
      c.links.push({ t: name, u: u }); persist(); ti2.value = ''; ui.value = ''; drawLinks();
    }
    ab.addEventListener('click', doAdd);
    ui.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doAdd(); } });
    add.appendChild(ti2); add.appendChild(ui); add.appendChild(ab); card.appendChild(add);

    /* anotações */
    card.appendChild(el('div', 'lbl', 'Minhas anotações'));
    card.appendChild(buildEditor(c));

    if (multi) {
      var del = el('button', 'lrm', 'Excluir este tópico'), armed = null; del.type = 'button';
      del.addEventListener('click', function () {
        if (!armed) {
          del.textContent = 'Clique de novo para excluir (links e anotações serão perdidos)';
          armed = setTimeout(function () { armed = null; del.textContent = 'Excluir este tópico'; }, 4000);
          return;
        }
        clearTimeout(armed);
        var arr = cardsOf(si, ti), p = arr.indexOf(c);
        if (p >= 0 && arr.length > 1) arr.splice(p, 1);
        persist(); drawCards(); meta();
      });
      card.appendChild(del);
    }
    return card;
  }
  function drawCards() {
    var si = UI.si, ti = curTi(si), cs = cardsOf(si, ti), multi = cs.length > 1;
    cardsEl.textContent = '';
    cs.forEach(function (c) { cardsEl.appendChild(buildCard(si, ti, c, multi)); });
    var nf = el('div', 'ladd newtopic');
    var ni = document.createElement('input'); ni.type = 'text'; ni.placeholder = 'Novo tópico nesta estação (ex.: Funções)'; ni.setAttribute('aria-label', 'Nome do novo tópico');
    var nb = el('button', 'cbtn', 'Adicionar tópico'); nb.type = 'button';
    function addTopic() {
      var t = ni.value.trim(); if (!t) { ni.focus(); return; }
      cs.push(norm({ id: 'x' + Date.now(), title: t }, cs.length)); persist(); drawCards(); meta();
    }
    nb.addEventListener('click', addTopic);
    ni.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addTopic(); } });
    nf.appendChild(ni); nf.appendChild(nb); cardsEl.appendChild(nf);
  }
  function selectTask(ti, focus) {
    UI.tis[UI.si] = ti; saveUI();
    drawRail(); drawHead(); drawCards();
    if (focus) { var b = document.getElementById('est-t-' + UI.si + '-' + ti); if (b) b.focus(); }
  }
  function renderStage() {
    var si = UI.si, s = S[si];
    stageEl.textContent = '';
    var box = el('section', 'estage'); box.style.setProperty('--sc', 'var(' + s.var + ')');
    var h = el('div', 'estage-h'); h.appendChild(el('h3', null, 'Etapa ' + si + ': ' + s.name)); h.appendChild(el('span', 'weeks', s.weeks));
    box.appendChild(h); box.appendChild(el('p', 'mgoal', s.goal));
    var bar = el('div', 'mbar'); bar.setAttribute('aria-hidden', 'true'); barI = el('i'); bar.appendChild(barI); box.appendChild(bar);
    var pr = el('div', 'ebar'); progTxt = el('span', 'cmeta'); pr.appendChild(progTxt);
    pr.appendChild(copyBtn('Copiar esta etapa', function () { return ['# CADERNO DE ESTUDOS', ''].concat(stageText(si, true)).join('\n'); }));
    pr.appendChild(copyBtn('Copiar tudo', allText));
    pr.appendChild(el('span', 'cmeta', 'Tudo fica salvo só neste navegador: copie de vez em quando.'));
    box.appendChild(pr);
    var lay = el('div', 'elay');
    rail = el('div', 'erail'); rail.setAttribute('role', 'tablist'); rail.setAttribute('aria-orientation', 'vertical'); rail.setAttribute('aria-label', 'Estações da etapa ' + s.name);
    rail.addEventListener('keydown', function (e) {
      if (!/^(ArrowDown|ArrowUp|ArrowRight|ArrowLeft|Home|End)$/.test(e.key)) return;
      var n = S[si].tasks.length, ti = curTi(si);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') ti = (ti + 1) % n;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ti = (ti - 1 + n) % n;
      else if (e.key === 'Home') ti = 0; else ti = n - 1;
      e.preventDefault(); selectTask(ti, true);
    });
    panel = el('div', 'epanel'); panel.id = 'estPanel'; panel.setAttribute('role', 'tabpanel');
    headEl = el('div', 'chead'); cardsEl = el('div', 'ecards');
    panel.appendChild(headEl); panel.appendChild(cardsEl);
    lay.appendChild(rail); lay.appendChild(panel); box.appendChild(lay);
    stageEl.appendChild(box);
    drawPills(); drawProg(); drawRail(); drawHead(); drawCards();
  }
  function selectStage(si) { UI.si = si; saveUI(); renderStage(); }

  window.estudosInit = function (STAGES) {
    S = STAGES;
    pillsEl = document.getElementById('estPills'); stageEl = document.getElementById('estStage');
    if (!pillsEl || !stageEl) return;
    load();
    seedLinks();
    UI.si = S[1] ? 1 : 0;
    try {
      var u = JSON.parse(localStorage.getItem(UIK) || 'null');
      if (u && typeof u.si === 'number' && S[u.si]) { UI.si = u.si; UI.tis = (u.tis && typeof u.tis === 'object') ? u.tis : {}; }
    } catch (e) {}
    renderStage();
    syncSticky();
  };
  function syncSticky() {
    var tabs = document.getElementById('tabsNav'), r = document.getElementById('mapaRoot');
    if (!tabs || !r) return;
    r.style.setProperty('--tabsH', tabs.offsetHeight + 'px');
    if (!syncSticky.on) {
      syncSticky.on = true;
      window.addEventListener('resize', syncSticky);
      if (window.ResizeObserver) new ResizeObserver(syncSticky).observe(tabs);
    }
  }
  window.estudosOpen = function (si, ti) {
    if (!S[si] || !S[si].tasks[ti]) return;
    UI.si = si; UI.tis[si] = ti; saveUI(); renderStage();
  };
})();
  
