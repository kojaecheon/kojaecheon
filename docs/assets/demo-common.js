'use strict';

const byId = id => document.getElementById(id);

function row(list, title, detail) {
  const item = document.createElement('div');
  const label = document.createElement('b');
  const value = document.createElement('span');
  label.textContent = title;
  value.textContent = detail;
  item.append(label, value);
  list.append(item);
}
function empty(list, message) {
  const line = document.createElement('div');
  line.className = 'empty';
  line.textContent = message;
  list.append(line);
}
