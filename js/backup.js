/* Importar e exportar os dados salvos no navegador (localStorage). */
(function () {
  'use strict';
  var PREFIXES = ['rotina-', 'mapa-'];
  var FORMAT = 'minha-rotina-backup';
  var btn = document.getElementById('backupBtn');
  if (!btn) return;

  function mine(k) { return PREFIXES.some(function (p) { return k.indexOf(p) === 0; }); }
  function listKeys() {
    var ks = [];
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (mine(k)) ks.push(k); } } catch (e) {}
    return ks.sort();
  }
  function buildExport() {
    var data = {};
    listKeys().forEach(function (k) { try { data[k] = localStorage.getItem(k); } catch (e) {} });
    return JSON.stringify({ format: FORMAT, version: 1, exportedAt: new Date().toISOString(), data: data }, null, 2);
  }
  function parseImport(text) {
    var obj;
    try { obj = JSON.parse(text); } catch (e) { throw new Error('Esse conteúdo não é um JSON válido.'); }
    if (!obj || obj.format !== FORMAT || !obj.data || typeof obj.data !== 'object') throw new Error('Esse arquivo não é um backup deste planner.');
    var clean = {}, n = 0;
    Object.keys(obj.data).forEach(function (k) {
      if (mine(k) && typeof obj.data[k] === 'string') { clean[k] = obj.data[k]; n++; }
    });
    if (!n) throw new Error('O backup não tem nenhum dado para importar.');
    return { data: clean, count: n, exportedAt: obj.exportedAt || '' };
  }
  function stamp() { var d = new Date(), p = function (x) { return (x < 10 ? '0' : '') + x; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function br(iso) { var d = new Date(iso); return isNaN(d) ? '' : d.toLocaleString('pt-BR'); }

  var overlay = document.createElement('div');
  overlay.className = 'bk-overlay';
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="bk-dialog" role="dialog" aria-modal="true" aria-labelledby="bkTitle">' +
      '<h2 id="bkTitle">Meus dados</h2>' +
      '<p>Tudo o que você marcou e escreveu fica salvo só neste navegador. Exporte para guardar uma cópia ou levar para outro aparelho.</p>' +
      '<h3>Exportar</h3>' +
      '<div class="bk-row">' +
        '<button type="button" class="bk-btn main" id="bkDown">Baixar arquivo</button>' +
        '<button type="button" class="bk-btn" id="bkCopy">Copiar texto</button>' +
      '</div>' +
      '<p>Se o download não começar neste ambiente, use “Copiar texto” e cole em um arquivo com extensão .json.</p>' +
      '<h3>Importar</h3>' +
      '<label for="bkFile" class="bk-lbl">Escolha o arquivo de backup (.json)</label>' +
      '<input type="file" id="bkFile" class="bk-file" accept=".json,application/json">' +
      '<label for="bkText" class="bk-lbl" style="display:block;margin-top:10px">Ou cole o texto do backup</label>' +
      '<textarea id="bkText" spellcheck="false" placeholder="Cole aqui o conteúdo do backup"></textarea>' +
      '<div class="bk-row">' +
        '<button type="button" class="bk-btn main" id="bkImport">Importar</button>' +
        '<button type="button" class="bk-btn danger" id="bkConfirm" hidden>Substituir meus dados</button>' +
      '</div>' +
      '<div class="bk-msg" id="bkMsg" role="status" aria-live="polite"></div>' +
      '<div class="bk-row"><button type="button" class="bk-btn" id="bkClose">Fechar</button></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var $ = function (id) { return document.getElementById(id); };
  var pending = null, opener = null;

  function say(t, err) { var m = $('bkMsg'); m.textContent = t || ''; m.className = 'bk-msg' + (err ? ' err' : ''); }
  function open() {
    opener = document.activeElement;
    pending = null; $('bkConfirm').hidden = true; $('bkText').value = ''; $('bkFile').value = '';
    say(listKeys().length + ' itens salvos neste navegador.');
    overlay.hidden = false;
    $('bkDown').focus();
  }
  function close() { overlay.hidden = true; pending = null; if (opener && opener.focus) opener.focus(); }

  btn.addEventListener('click', open);
  $('bkClose').addEventListener('click', close);
  overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = overlay.querySelectorAll('button:not([hidden]),input,textarea');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  $('bkDown').addEventListener('click', function () {
    try {
      var blob = new Blob([buildExport()], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'minha-rotina-backup-' + stamp() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      say('Backup gerado com ' + listKeys().length + ' itens.');
    } catch (e) { say('Não consegui gerar o arquivo. Use “Copiar texto”.', true); }
  });

  $('bkCopy').addEventListener('click', function () {
    var text = buildExport();
    function fallback() {
      var ta = $('bkText'); ta.value = text; ta.focus(); ta.select();
      try { if (document.execCommand('copy')) { say('Texto copiado. Ele também ficou na caixa abaixo.'); return; } } catch (e) {}
      say('Copie manualmente o texto que apareceu na caixa abaixo.');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say('Texto copiado. Cole em um arquivo .json para guardar.'); }, fallback);
    } else { fallback(); }
  });

  $('bkFile').addEventListener('change', function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () { $('bkText').value = String(r.result || ''); pending = null; $('bkConfirm').hidden = true; say('Arquivo lido. Clique em Importar.'); };
    r.onerror = function () { say('Não consegui ler o arquivo.', true); };
    r.readAsText(f);
    e.target.value = '';
  });

  $('bkImport').addEventListener('click', function () {
    try {
      pending = parseImport($('bkText').value.trim());
      var when = pending.exportedAt ? ' (backup de ' + br(pending.exportedAt) + ')' : '';
      say('Pronto para importar ' + pending.count + ' itens' + when + '. Isso substitui os dados atuais deste navegador. Confirme para continuar.');
      $('bkConfirm').hidden = false; $('bkConfirm').focus();
    } catch (e) { pending = null; $('bkConfirm').hidden = true; say(e.message, true); }
  });

  $('bkConfirm').addEventListener('click', function () {
    if (!pending) return;
    try {
      listKeys().forEach(function (k) { localStorage.removeItem(k); });
      Object.keys(pending.data).forEach(function (k) { localStorage.setItem(k, pending.data[k]); });
      say('Importado. Recarregando…');
      setTimeout(function () { location.reload(); }, 400);
    } catch (e) { say('Não consegui gravar os dados neste navegador.', true); }
  });
})();
