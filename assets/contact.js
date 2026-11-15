(() => {
  'use strict';
  const $$ = s => [...document.querySelectorAll(s)];

  // copy the email / phone with one click
  $$('[data-copy-btn]').forEach(b => b.addEventListener('click', async () => {
    const v = b.parentElement.querySelector('[data-copy]').textContent.trim(), label = b.textContent;
    try { await navigator.clipboard.writeText(v); b.textContent = 'Copied'; }
    catch { b.textContent = 'Copy not available'; }
    setTimeout(() => { b.textContent = label; }, 1800);
  }));

  // a soft light follows the cursor across each card
  $$('.cd').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  }));
})();
