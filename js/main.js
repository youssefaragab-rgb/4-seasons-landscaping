const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
});

// Demo form: validates and shows a confirmation. Wire to Formspree/Netlify Forms when going live.
const form = document.getElementById('quote-form');
const note = form.querySelector('.form-note');
form.addEventListener('submit', e => {
  e.preventDefault();
  const bad = [...form.querySelectorAll('[name=name],[name=phone]')].filter(i => !i.value.trim());
  form.querySelectorAll('input').forEach(i => i.classList.remove('err'));
  if (bad.length) {
    bad.forEach(i => i.classList.add('err'));
    note.className = 'form-note bad';
    note.textContent = 'Please add your name and phone number so we can reach you.';
    bad[0].focus();
    return;
  }
  note.className = 'form-note ok';
  note.textContent = "Thanks! We'll get back to you shortly.";
  form.reset();
});

// Project gallery: filter chips + lightbox
const chips = document.querySelectorAll('.chip');
const tiles = document.querySelectorAll('.g');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', x === c); });
  const f = c.dataset.f;
  tiles.forEach(t => { t.hidden = f !== 'all' && !t.dataset.cat.split(' ').includes(f); });
}));
const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
tiles.forEach(t => t.addEventListener('click', () => {
  const im = t.querySelector('img');
  lbImg.src = im.src; lbImg.alt = im.alt;
  lb.showModal();
}));
lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-x')) lb.close(); });
