(() => {
  'use strict';
  const $$ = s => [...document.querySelectorAll(s)];

  /* ---------------- each module card draws its charts when it first comes into view ---------------- */
  const mods = $$('.mod');
  const seen = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('seen'); seen.unobserve(e.target); }
  }), { rootMargin: '0px 0px -15% 0px' });
  mods.forEach(m => seen.observe(m));

  /* ---------------- navigator follows the card in view ---------------- */
  const links = $$('.mnav a'), strip = document.querySelector('.mnav ol');
  let cur = '';
  const mark = id => {
    if (id === cur) return;
    cur = id;
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      // phone: keep the active chip visible in the horizontal strip
      if (on && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: a.parentElement.offsetLeft - 16, behavior: 'smooth' });
    });
  };
  const spy = () => {
    const line = innerHeight * .35;
    let id = mods[0] && mods[0].id;
    for (const m of mods) if (m.getBoundingClientRect().top <= line) id = m.id;
    mark(id);
  };
  let raf = 0;
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; spy(); }); }, { passive: true });
  addEventListener('resize', spy);
  spy();
})();
