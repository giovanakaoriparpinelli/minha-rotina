  (function () {
    var root = document.querySelector('.tabpanel[data-tab="entrevistas"]');
    var btns = root.querySelectorAll('.ivtabs button'), subs = root.querySelectorAll('.ivsub');
    function show(n) {
      btns.forEach(function (b) { b.setAttribute('aria-selected', b.dataset.sub === n ? 'true' : 'false'); });
      subs.forEach(function (s) { s.hidden = s.dataset.sub !== n; });
      try { localStorage.setItem('mapa-entrevistas-sub-v1', n); } catch (e) {}
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.sub); }); });
    var st = 'concert';
    try { st = localStorage.getItem('mapa-entrevistas-sub-v1') || 'concert'; } catch (e) {}
    if (location.hash === '#entrevista-concert') st = 'concert';
    show(st === 'grownt' ? 'grownt' : 'concert');
    window.addEventListener('hashchange', function () { if (location.hash === '#entrevista-concert') show('concert'); });
  })();
  
