console.log("✅ Script.js is geladen!");

(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const knob = btn.querySelector('.knob');
  const LABEL = 'site-theme'; // key voor localStorage — aan te passen aan eigen voorkeur

  // detecteer voorkeur systeem (dark) als er nog geen keuze is
  function detectPrefersDark(){
    try{
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }catch(e){ return false; }
  }

  // apply theme op root attribute
  function applyTheme(name){
    if(name === 'dark'){
      root.setAttribute('data-theme','dark');
      btn.setAttribute('aria-pressed','true');
      knob.textContent = '🌙';
    }else{
      root.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed','false');
      knob.textContent = '☀️';
    }
  }

  // read stored or system
  let theme = localStorage.getItem(LABEL);
  if(!theme){ theme = detectPrefersDark() ? 'dark' : 'light'; }
  applyTheme(theme);

  // toggle handler
  btn.addEventListener('click', ()=>{
    theme = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
    localStorage.setItem(LABEL, theme);
    applyTheme(theme);
  });

  // keyboard accessibility: toggle on Enter/Space
  btn.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click(); }
  });

  // listen systeemwijziging en respecteer opgeslagen keuze
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e=>{
      const stored = localStorage.getItem(LABEL);
      if(!stored){ // alleen bij geen expliciete keuze
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // small enhancement: allow setting via data-theme attribute on html itself
  // (useful in frameworks/server-rendering)
})();