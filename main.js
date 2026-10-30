(() => {
  const CFG = window.FORJADO_CONFIG || {}, DICT = window.FORJADO_I18N, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const LANGS = ['es', 'fr', 'en'];
  let lang = 'es';

  /* ---- Idiomas ---- */
  function setLang(l, persist = true) {
    if (!LANGS.includes(l)) l = 'es';
    lang = l; const t = DICT[l];
    document.documentElement.lang = l;
    $$('[data-i18n]').forEach(el => { if (t[el.dataset.i18n] != null) el.textContent = t[el.dataset.i18n]; });
    $$('[data-i18n-alt]').forEach(el => el.alt = t[el.dataset.i18nAlt] || '');
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t[el.dataset.i18nAria]));
    document.title = t['meta.title'];
    $('meta[name=description]').content = t['meta.desc'];
    $('meta[property="og:title"]').content = t['meta.title'];
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
    setWhatsApp();
    if (persist) try { localStorage.setItem('forjado-lang', l); } catch (e) {}
  }
  const saved = (() => { try { return localStorage.getItem('forjado-lang'); } catch (e) { return null; } })();
  const fromUrl = new URLSearchParams(location.search).get('lang');
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---- WhatsApp (número en config.js) ---- */
  function setWhatsApp() {
    const n = String(CFG.WHATSAPP_NUMBER || '').replace(/\D/g, ''), wrap = $('#waWrap');
    if (!n) { wrap.hidden = true; return; }
    wrap.hidden = false;
    $('#waBtn').href = `https://wa.me/${n}?text=${encodeURIComponent(DICT[lang]['wa.msg'])}`;
  }

  /* ---- Navegación ---- */
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const closeMenu = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
  menu.addEventListener('click', e => e.target.closest('a') && closeMenu());
  addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
  // El CTA de la oferta preselecciona el servicio en el formulario
  $$('[data-service]').forEach(a => a.addEventListener('click', () => { $('#service').selectedIndex = +a.dataset.service; }));

  /* ---- Animaciones al hacer scroll ---- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px' }) : null;
  $$('.rv').forEach((el, i) => { el.style.setProperty('--d', (i % 4) * .08 + 's'); io ? io.observe(el) : el.classList.add('in'); });

  /* ---- Slider del portafolio ---- */
  const track = $('#track'), cases = $$('.case', track), prev = $('#prev'), next = $('#next'), cur = $('#cur');
  let idx = 0;
  const go = i => { idx = Math.max(0, Math.min(cases.length - 1, i)); track.scrollTo({ left: cases[idx].offsetLeft - cases[0].offsetLeft, behavior: 'smooth' }); mark(); };
  function mark() {
    cases.forEach((c, i) => c.classList.toggle('active', i === idx));
    cur.textContent = String(idx + 1).padStart(2, '0'); prev.disabled = idx === 0; next.disabled = idx === cases.length - 1;
  }
  prev.addEventListener('click', () => go(idx - 1)); next.addEventListener('click', () => go(idx + 1));
  track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); } });
  let t; track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => {
    const base = cases[0].offsetLeft, pos = track.scrollLeft;
    idx = cases.reduce((b, c, i) => Math.abs(c.offsetLeft - base - pos) < Math.abs(cases[b].offsetLeft - base - pos) ? i : b, 0); mark(); }, 80); }, { passive: true });
  mark();

  /* ---- Parallax sutil del hero ---- */
  const hero = $('.hero');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover:hover)').matches) {
    hero.addEventListener('mousemove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      $$('[data-depth]').forEach(el => { const d = +el.dataset.depth; el.style.translate = `${-x * d}px ${-y * d}px`; });
    });
  }

  /* ---- Formulario ---- */
  const form = $('#form'), status = $('#status'), send = $('#send');
  const say = (msg, cls) => { status.textContent = msg; status.className = 'status ' + (cls || ''); };
  form.addEventListener('submit', async e => {
    e.preventDefault(); const t = DICT[lang];
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // anti-spam
    data.language = lang;
    if (CFG.FORM_ENDPOINT) {
      send.disabled = true; say(t['f.sending']);
      try {
        const r = await fetch(CFG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw 0;
        form.reset(); say(t['f.ok'], 'ok');
      } catch (_) { say(t['f.err'], 'err'); }
      send.disabled = false;
    } else if (String(CFG.WHATSAPP_NUMBER || '').replace(/\D/g, '')) {
      const txt = `${t['wa.msg']}\n\n${t['f.name']}: ${data.name}\n${t['f.biz']}: ${data.business}\n${t['f.email']}: ${data.email}\n${t['f.phone']}: ${data.phone || '-'}\n${t['f.service']}: ${form.service.selectedOptions[0].textContent}\n${data.message || ''}`;
      window.open(`https://wa.me/${String(CFG.WHATSAPP_NUMBER).replace(/\D/g, '')}?text=${encodeURIComponent(txt)}`, '_blank', 'noopener');
      say(t['f.ok'], 'ok');
    } else say(t['f.nocfg'], 'err');
  });

  $('#year').textContent = new Date().getFullYear();
  setLang(LANGS.includes(fromUrl) ? fromUrl : LANGS.includes(saved) ? saved : 'es', false);
})();
