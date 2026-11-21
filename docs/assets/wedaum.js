'use strict';

const cases = [
  { code:'상담 A', reason:'견적 안내 후 회신 대기' },
  { code:'상담 B', reason:'예약 일정 재확인' },
  { code:'상담 C', reason:'다음 상담 시간 조율' }
];
const assignments = new Map();
function renderBoard() {
  const selector = byId('case');
  const before = selector.value;
  selector.replaceChildren();
  const list = byId('case-list');
  list.replaceChildren();
  for (const item of cases) {
    const team = assignments.get(item.code);
    row(list, item.code + ' · ' + item.reason, team ? team + ' 인계 완료' : '대기');
    if (!team) selector.add(new Option(item.code + ' · ' + item.reason, item.code));
  }
  const remaining = cases.length - assignments.size;
  if (remaining === 0) selector.add(new Option('모두 인계했습니다', ''));
  else if (before && !assignments.has(before)) selector.value = before;
  byId('wed-count').textContent = remaining + '건';
  selector.disabled = remaining === 0;
  byId('team').disabled = remaining === 0;
  byId('handoff').disabled = remaining === 0;
}
byId('handoff').addEventListener('click', () => {
  const code = byId('case').value;
  const team = byId('team').value;
  if (!code || assignments.has(code)) return;
  assignments.set(code, team);
  byId('handoff-status').textContent = code + ' 담당 팀을 ' + team + '으로 지정했습니다.';
  renderBoard();
  if (byId('handoff').disabled) byId('restart').focus();
});
byId('restart').addEventListener('click', () => {
  assignments.clear();
  byId('team').selectedIndex = 0;
  byId('case').value = '';
  renderBoard();
  byId('handoff-status').textContent = '세 상담을 인계 대기 상태로 되돌렸습니다.';
});

renderBoard();
