'use strict';

const format = new Intl.NumberFormat('ko-KR');
const won = value => format.format(value) + '원';
const amountField = byId('amount');
function getAmount() {
  const raw = amountField.value.trim();
  if (!/^\d+$|^\d{1,3}(,\d{3})+$/.test(raw)) return null;
  const value = Number(raw.replaceAll(',', ''));
  return Number.isInteger(value) && value >= 1 && value <= 1000000 ? value : null;
}
function calculateTrip() {
  const amount = getAmount();
  const members = ['유나', ...Array.from(document.querySelectorAll('input[name="member"]:checked'), box => box.value)];
  const list = byId('transfers');
  list.replaceChildren();
  byId('trip-count').textContent = members.length + '명 분담';
  byId('amount-error').hidden = amount !== null;
  amountField.setAttribute('aria-invalid', String(amount === null));
  byId('rounding').hidden = true;
  if (amount === null) {
    byId('trip-due').textContent = '계산 대기';
    empty(list, '결제 금액을 입력하면 결과가 표시됩니다.');
    return;
  }
  const base = Math.floor(amount / members.length);
  const remainder = amount % members.length;
  const shares = members.map((_, i) => base + Number(i < remainder));
  byId('trip-due').textContent = won(amount - shares[0]);
  row(list, '유나 본인 부담', won(shares[0]));
  members.slice(1).forEach((member, i) => row(list, member + '가 유나에게 송금', won(shares[i+1])));
  if (members.length === 1) empty(list, '함께 분담할 사람이 없어 송금할 금액이 없습니다.');
  byId('rounding').hidden = remainder === 0;
}
byId('trip-form').addEventListener('input', calculateTrip);
byId('trip-form').addEventListener('submit', event => event.preventDefault());
amountField.addEventListener('blur', () => {
  const amount = getAmount();
  if (amount !== null) amountField.value = format.format(amount);
});

calculateTrip();
