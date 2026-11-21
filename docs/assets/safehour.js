'use strict';

const tourOptions = [
  { name:'인근 갤러리', inside:true, travel:20, stay:20 },
  { name:'근린공원 산책', inside:false, travel:30, stay:30 },
  { name:'전시관 관람', inside:true, travel:45, stay:50 }
];
function clockTime(minutes) {
  return Math.floor(minutes / 60) + ':' + String(minutes % 60).padStart(2, '0');
}
function planDay() {
  const start = 14 * 60;
  const budget = Number(byId('deadline').value) - start;
  const buffer = 15;
  const indoorsOnly = byId('indoors').checked;
  const routes = tourOptions.filter(place =>
    place.travel + place.stay + buffer <= budget && (!indoorsOnly || place.inside)
  );
  const list = byId('routes');
  list.replaceChildren();
  byId('safe-count').textContent = '후보 ' + routes.length + '곳';
  byId('safe-budget').textContent = budget + '분';
  routes.forEach(place => row(list, place.name, '복귀 예정 ' + clockTime(start + place.travel + place.stay)));
  if (!routes.length) empty(list, '복귀 여유를 확보할 수 없어 외출을 일정에 넣지 않습니다.');
}
byId('deadline').addEventListener('change', planDay);
byId('indoors').addEventListener('change', planDay);

planDay();
