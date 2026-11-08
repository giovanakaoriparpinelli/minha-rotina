  (function () {
    var STAT = ['Enviada', 'Em análise', 'Entrevista RH', 'Teste técnico', 'Entrevista técnica', 'Oferta', 'Encerrada'];
    var RET = ['Aguardando', 'Positivo', 'Negativo', 'Sem retorno'];
    var K = 'mapa-candidaturas-v1', MK = 'mapa-candidaturas-meta-v1';
    var SEED = [];
    var seq = 0;
    function nid() { seq++; return 'c' + Date.now().toString(36) + seq; }
    var rows = null, meta = 30, lastDel = null, filt = '';
    try { var s = JSON.parse(localStorage.getItem(K) || 'null'); if (Array.isArray(s)) rows = s; } catch (e) { rows = null; }
    if (!rows) rows = SEED.map(function (r) { return { id: nid(), e: r[0], v: r[1], d: r[2], l: r[3], s: r[4], r: r[5] }; });
    try { var m = parseInt(localStorage.getItem(MK), 10); if (m > 0) meta = m; } catch (e) {}
    function save() { try { localStorage.setItem(K, JSON.stringify(rows)); } catch (e) {} }
    function p2(n) { return (n < 10 ? '0' : '') + n; }
    function iso(d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
    function today() { return iso(new Date()); }
    function br(s) { var a = (s || '').split('-'); return a.length === 3 ? a[2] + '/' + a[1] + '/' + a[0] : ''; }
    function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function opts(list, sel) { return list.map(function (o) { return '<option' + (o === sel ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join(''); }
    function color(st) {
      if (st === 'Oferta') return 'var(--c1)';
      if (st === 'Entrevista RH' || st === 'Entrevista técnica' || st === 'Teste técnico') return 'var(--c2)';
      if (st === 'Encerrada') return 'var(--rule)';
      return 'var(--c3)';
    }
    function isUrl(u) { return /^https?:\/\//i.test((u || '').trim()); }
    function future(d) { return !!d && d > today(); }
    var $ = function (id) { return document.getElementById(id); };

    function renderSum() {
      var valid = rows.filter(function (r) { return (r.e || '').trim(); });
      var total = valid.length;
      var t = new Date(); t.setDate(t.getDate() - 6);
      var from = iso(t), to = today();
      var sete = valid.filter(function (r) { return r.d >= from && r.d <= to; }).length;
      var resp = valid.filter(function (r) { return r.r === 'Positivo' || r.r === 'Negativo'; }).length;
      var proc = valid.filter(function (r) { return r.s.indexOf('Entrevista') === 0 || r.s === 'Teste técnico'; }).length;
      var ofe = valid.filter(function (r) { return r.s === 'Oferta'; }).length;
      var pct = Math.round(Math.min(1, total / meta) * 100);
      var taxa = total ? Math.round(resp / total * 100) : 0;
      $('cdSum').innerHTML =
        '<div><small>Total de candidaturas</small><b>' + total + '</b><div class="cand-bar"><i style="width:' + pct + '%"></i></div><small>' + pct + '% da meta de ' + meta + '</small></div>' +
        '<div><small>Nos últimos 7 dias</small><b>' + sete + '</b></div>' +
        '<div><small>Respostas (positivas ou negativas)</small><b>' + resp + '</b><small>Taxa de resposta: ' + taxa + '%</small></div>' +
        '<div><small>Em processo seletivo</small><b>' + proc + '</b><small>Entrevista ou teste</small></div>' +
        '<div><small>Ofertas</small><b>' + ofe + '</b></div>';
      var msg;
      if (total < 40) msg = 'Continue enviando: a leitura só faz sentido a partir de cerca de 40 candidaturas.';
      else if (resp === 0) msg = 'Nenhuma resposta: revise currículo, LinkedIn e o nível das vagas escolhidas.';
      else if (proc === 0) msg = 'Há respostas, mas nenhuma entrevista: ajuste o currículo ao texto de cada vaga.';
      else if (ofe === 0) msg = 'Há entrevistas, sem oferta: reforce o pitch, a parte técnica e o inglês falado.';
      else msg = 'Há oferta: compare as propostas e decida com calma.';
      $('cdRead').textContent = 'Leitura rápida (indicativa): ' + msg;
    }

    function rowHtml(r) {
      var warn = future(r.d) ? '<span class="cand-warn">Data no futuro: confira</span>' : '';
      return '<div class="cand-row" data-id="' + esc(r.id) + '" style="--rc:' + color(r.s) + '">' +
        '<div class="f" data-l="Empresa"><input data-f="e" value="' + esc(r.e) + '" aria-label="Empresa"></div>' +
        '<div class="f" data-l="Vaga"><input data-f="v" value="' + esc(r.v) + '" aria-label="Vaga"></div>' +
        '<div class="f" data-l="Data"><input type="date" data-f="d" value="' + esc(r.d) + '" aria-label="Data">' + warn + '</div>' +
        '<div class="f" data-l="Link"><div class="lnk"><input data-f="l" value="' + esc(r.l) + '" placeholder="Link ou e-mail" aria-label="Link"><a data-open href="' + (isUrl(r.l) ? esc(r.l.trim()) : '#') + '" target="_blank" rel="noopener noreferrer"' + (isUrl(r.l) ? '' : ' hidden') + '>Abrir</a></div></div>' +
        '<div class="f" data-l="Status"><select data-f="s" aria-label="Status">' + opts(STAT, r.s) + '</select></div>' +
        '<div class="f" data-l="Retorno"><select data-f="r" aria-label="Retorno">' + opts(RET, r.r) + '</select></div>' +
        '<button type="button" class="cand-x" data-del aria-label="Excluir candidatura" title="Excluir">✕</button></div>';
    }
    function renderList() {
      var list = rows.filter(function (r) { return !filt || r.s === filt; });
      $('cdList').innerHTML = list.length ? list.map(rowHtml).join('') : '<div class="cand-empty">Nenhuma candidatura neste filtro.</div>';
      $('cdUndo').hidden = !lastDel;
    }
    function renderAll() { renderList(); renderSum(); }

    $('cdFilter').innerHTML = '<option value="">Todas</option>' + STAT.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('');
    $('cdFilter').addEventListener('change', function () { filt = this.value; renderList(); });
    $('cdMeta').value = meta;
    $('cdMeta').addEventListener('input', function () {
      var v = parseInt(this.value, 10);
      if (v > 0) { meta = v; try { localStorage.setItem(MK, String(v)); } catch (e) {} renderSum(); }
    });
    function find(el) {
      var row = el.closest ? el.closest('.cand-row') : null;
      if (!row) return null;
      var id = row.getAttribute('data-id');
      for (var i = 0; i < rows.length; i++) if (rows[i].id === id) return { row: row, i: i };
      return null;
    }
    $('cdList').addEventListener('input', function (e) {
      var f = e.target.getAttribute && e.target.getAttribute('data-f');
      if (!f || e.target.tagName === 'SELECT') return;
      var h = find(e.target); if (!h) return;
      rows[h.i][f] = e.target.value; save();
      if (f === 'l') {
        var a = h.row.querySelector('[data-open]'), u = e.target.value.trim();
        if (isUrl(u)) { a.href = u; a.hidden = false; } else { a.hidden = true; }
      }
      if (f === 'd') {
        var w = h.row.querySelector('.cand-warn');
        if (future(e.target.value)) {
          if (!w) { w = document.createElement('span'); w.className = 'cand-warn'; w.textContent = 'Data no futuro: confira'; e.target.parentNode.appendChild(w); }
        } else if (w) { w.remove(); }
      }
      if (f === 'e' || f === 'd') renderSum();
    });
    $('cdList').addEventListener('change', function (e) {
      var f = e.target.getAttribute && e.target.getAttribute('data-f');
      if (!f || e.target.tagName !== 'SELECT') return;
      var h = find(e.target); if (!h) return;
      rows[h.i][f] = e.target.value; save();
      if (f === 's') h.row.style.setProperty('--rc', color(e.target.value));
      renderSum();
    });
    $('cdList').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-del]') : null;
      if (!b) return;
      var h = find(b); if (!h) return;
      lastDel = { r: rows[h.i], i: h.i };
      rows.splice(h.i, 1); save(); renderAll();
    });
    $('cdUndo').addEventListener('click', function () {
      if (!lastDel) return;
      rows.splice(Math.min(lastDel.i, rows.length), 0, lastDel.r);
      lastDel = null; save(); renderAll();
    });
    $('cdAdd').addEventListener('click', function () {
      rows.push({ id: nid(), e: '', v: '', d: today(), l: '', s: 'Enviada', r: 'Aguardando' });
      filt = ''; $('cdFilter').value = ''; save(); renderAll();
      var inp = $('cdList').querySelectorAll('.cand-row');
      var last = inp[inp.length - 1];
      if (last) { var f = last.querySelector('input'); if (f) f.focus(); }
    });
    $('cdCopy').addEventListener('click', function () {
      var TAB = String.fromCharCode(9), NL = String.fromCharCode(10);
      function cl(s) { return String(s || '').split(TAB).join(' ').split(NL).join(' '); }
      var out = [['Empresa', 'Vaga', 'Data', 'Link', 'Status', 'Retorno'].join(TAB)].concat(rows.map(function (r) {
        return [cl(r.e), cl(r.v), br(r.d), cl(r.l), r.s, r.r].join(TAB);
      })).join(NL);
      var btn = this;
      function done(ok) { var o = btn.textContent; btn.textContent = ok ? 'Copiado' : 'Não foi possível copiar'; setTimeout(function () { btn.textContent = o; }, 1800); }
      function legacy() {
        var ta = document.createElement('textarea'); ta.value = out; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) {}
        ta.remove(); done(ok);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(out).then(function () { done(true); }, legacy);
      else legacy();
    });
    renderAll();
  })();
  
