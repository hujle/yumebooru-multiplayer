// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('changelog.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(renderChangelog)
    .catch(err => console.error('Changelog load error:', err));
});

function renderChangelog(entries) {
  const container = document.getElementById('changelog');
  container.innerHTML = '';

  entries.forEach(entry => {
    // entry wrapper
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';

    // header
    const header = document.createElement('div');
    header.className = 'entry-header collapsed';
    header.innerHTML = `
      <h2>${entry.date}</h2>
      <i class="fas fa-chevron-right toggle-icon"></i>
    `;
    // toggle body
    header.addEventListener('click', () => {
      body.style.display = body.style.display === 'block' ? 'none' : 'block';
      header.classList.toggle('collapsed');
    });

    // body
    const body = document.createElement('div');
    body.className = 'entry-body';

    // «таблица» изменений
    const table = document.createElement('div');
    table.className = 'changes-table';

    entry.games.forEach(game => {
      const row = document.createElement('div');
      row.className = 'changes-row';

      // имя игры
      const nameCell = document.createElement('div');
      nameCell.className = 'changes-cell cell-name';
      nameCell.textContent = game.name;

      // список изменений
      const changeCell = document.createElement('div');
      changeCell.className = 'changes-cell cell-changes';
      const ul = document.createElement('ul');
      game.changes.forEach(ch => {
        const li = document.createElement('li');
        if (ch.version) {
          li.textContent = `${ch.action} ${ch.version}`;
        } else if (ch.description) {
          li.textContent = `${ch.action} ${ch.description}`;
        } else {
          li.textContent = ch.action;
        }
        ul.appendChild(li);
      });
      changeCell.appendChild(ul);

      row.appendChild(nameCell);
      row.appendChild(changeCell);
      table.appendChild(row);
    });

    body.appendChild(table);
    entryDiv.appendChild(header);
    entryDiv.appendChild(body);
    container.appendChild(entryDiv);
  });
}