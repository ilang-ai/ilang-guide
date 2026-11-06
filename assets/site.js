/* ilang.guide — scroll-driven acts (no dependencies). Each .act gets --p in [0,1]; children with data-in / data-out get --v. */
(function () {
  var q = window.location.search;
  var reduce = /[?&]motion=0\b/.test(q) || (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !/[?&]motion=1\b/.test(q));
  var root = document.documentElement;
  var acts = Array.prototype.slice.call(document.querySelectorAll('.act'));
  var nav = document.querySelector('.nav');
  function clamp(x, a, b) { return Math.min(b, Math.max(a, x)); }
  function smooth(t) { return t * t * (3 - 2 * t); }

  function apply(act, p) {
    act.style.setProperty('--p', p.toFixed(4));
    var els = act.querySelectorAll('[data-in],[data-out]');
    for (var k = 0; k < els.length; k++) {
      var el = els[k];
      var i = el.hasAttribute('data-in') ? parseFloat(el.getAttribute('data-in')) : -1;
      var s = parseFloat(el.getAttribute('data-span') || '0.14');
      var o = el.hasAttribute('data-out') ? parseFloat(el.getAttribute('data-out')) : null;
      var v = i < 0 ? 1 : smooth(clamp((p - i) / s, 0, 1));
      if (o !== null) v = Math.min(v, smooth(clamp((o - p) / s, 0, 1)));
      el.style.setProperty('--v', v.toFixed(3));
      if (el.hasAttribute('data-type')) {
        var t = el.getAttribute('data-type');
        var n = Math.round(v * t.length);
        el.textContent = t.slice(0, n);
        el.classList.toggle('done', n === t.length);
      }
    }
    var lines = act.querySelectorAll('[data-at]');
    for (var j = 0; j < lines.length; j++) {
      var ln = lines[j];
      ln.classList.toggle('on', p >= parseFloat(ln.getAttribute('data-at')));
    }
    // a terminal follows its newest line, like a real one
    var pres = act.querySelectorAll('.term pre');
    for (var m = 0; m < pres.length; m++) {
      var on = pres[m].querySelectorAll('.ln.on');
      if (on.length) { var last = on[on.length - 1]; pres[m].scrollTop = Math.max(0, last.offsetTop + last.offsetHeight - pres[m].clientHeight + 12); }
    }
  }

  var ticking = false;
  function frame() {
    var vh = window.innerHeight;
    for (var i = 0; i < acts.length; i++) {
      var act = acts[i];
      var r = act.getBoundingClientRect();
      var total = act.offsetHeight - vh;
      var p = total <= 0 ? 1 : clamp(-r.top / total, 0, 1);
      if (act._p !== p) { act._p = p; apply(act, p); }
    }
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(frame); } }

  if (reduce) {
    root.classList.add('reduce');
    for (var a = 0; a < acts.length; a++) apply(acts[a], 1);
    window.addEventListener('scroll', function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); }, { passive: true });
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();
  }

  // reveal-on-enter for static sections
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // copy buttons: data-copy="#id" copies that element's text
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener('click', function () {
      var src = document.querySelector(btn.getAttribute('data-copy'));
      var text = src ? src.textContent.trim() : '';
      function done(ok) {
        btn.textContent = ok ? '已复制' : '请手动复制';
        btn.classList.toggle('ok', ok);
        setTimeout(function () { btn.textContent = label; btn.classList.remove('ok'); }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        try {
          var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
          var ok = document.execCommand('copy'); document.body.removeChild(ta); done(ok);
        } catch (e) { done(false); }
      }
    });
  });

  // host page: current section in the side index
  var toc = document.querySelector('.toc');
  if (toc && 'IntersectionObserver' in window) {
    var links = {};
    toc.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var secs = Array.prototype.slice.call(document.querySelectorAll('.doc section[id]'));
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('cur', k === e.target.id); });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    secs.forEach(function (s) { io2.observe(s); });
  }
})();
