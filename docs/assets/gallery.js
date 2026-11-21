'use strict';

const byId = id => document.getElementById(id);
const titles = {
  trip: 'TripMoney · 여행 정산 화면',
  safe: 'SafeHour · 안심 코스 화면',
  wed: 'WEDAUM · 상담 대시보드'
};
const viewer = byId('viewer');
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.zoom;
    const original = byId('img-' + key);
    const large = byId('large-shot');
    large.src = original.src;
    large.alt = original.alt;
    byId('viewer-title').textContent = titles[key];
    viewer.showModal();
    byId('close-viewer').focus();
  });
});
byId('close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const box = viewer.getBoundingClientRect();
  if (event.target === viewer &&
      (event.clientX < box.left || event.clientX > box.right ||
       event.clientY < box.top || event.clientY > box.bottom)) viewer.close();
});
