/* Inerday — language (EN/中文) + theme (light/dark) toggles.
   Selection persists across pages via localStorage. */
(function () {
  var root = document.documentElement;

  function getLang() { return root.getAttribute('data-lang') || 'en'; }
  function getTheme() { return root.getAttribute('data-theme') || 'light'; }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = (lang === 'zh') ? 'zh-CN' : 'en';
    // Swap any element that carries both data-en and data-zh.
    var nodes = document.querySelectorAll('[data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var val = nodes[i].getAttribute('data-' + lang);
      if (val !== null) nodes[i].innerHTML = val;
    }
    // The toggle shows the language you can switch TO.
    var labels = document.querySelectorAll('[data-lang-label]');
    for (var j = 0; j < labels.length; j++) {
      labels[j].textContent = (lang === 'en') ? '中文' : 'EN';
    }
    try { localStorage.setItem('iner-lang', lang); } catch (e) {}
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var icons = document.querySelectorAll('[data-theme-icon]');
    for (var i = 0; i < icons.length; i++) {
      icons[i].textContent = (theme === 'dark') ? '☀' : '☾';
    }
    try { localStorage.setItem('iner-theme', theme); } catch (e) {}
  }

  function init() {
    // data-theme / data-lang were set early by the inline head script.
    applyTheme(getTheme());
    applyLang(getLang());

    var lt = document.getElementById('langToggle');
    if (lt) lt.addEventListener('click', function () {
      applyLang(getLang() === 'en' ? 'zh' : 'en');
    });
    var tt = document.getElementById('themeToggle');
    if (tt) tt.addEventListener('click', function () {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
