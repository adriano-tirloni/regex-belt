const cardsEl = document.getElementById('cards');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category-filter');
const countEl = document.getElementById('count');

let patterns = [];

function parsePattern(patternString) {
  const match = patternString.match(/^\/(.+)\/([gimsuy]*)$/s);
  if (!match) return null;
  try {
    return new RegExp(match[1], match[2]);
  } catch {
    return null;
  }
}

function createCard(entry) {
  const regex = parsePattern(entry.pattern);

  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.name = entry.name.toLowerCase();
  card.dataset.description = entry.description.toLowerCase();
  card.dataset.category = entry.category;

  // Category
  const categoryEl = document.createElement('div');
  categoryEl.className = 'card-category';
  categoryEl.textContent = entry.categoryTitle;
  card.appendChild(categoryEl);

  // Name
  const nameEl = document.createElement('div');
  nameEl.className = 'card-name';
  nameEl.textContent = entry.name;
  card.appendChild(nameEl);

  // Description
  const descEl = document.createElement('p');
  descEl.className = 'card-description';
  descEl.textContent = entry.description;
  card.appendChild(descEl);

  // Notes
  if (entry.notes.length > 0) {
    const notesEl = document.createElement('div');
    notesEl.className = 'card-notes';
    notesEl.textContent = entry.notes.join(', ');
    card.appendChild(notesEl);
  }

  // Pattern
  const patternEl = document.createElement('code');
  patternEl.className = 'card-pattern';
  patternEl.textContent = entry.pattern;
  card.appendChild(patternEl);

  // Examples
  if (entry.examples.length > 0) {
    const examplesEl = document.createElement('div');
    examplesEl.className = 'card-examples';
    for (const ex of entry.examples) {
      const tag = document.createElement('span');
      tag.className = `example ${ex.matches ? 'example-match' : 'example-no-match'}`;
      tag.textContent = `${ex.matches ? '\u2705' : '\u274C'} ${ex.value}`;
      examplesEl.appendChild(tag);
    }
    card.appendChild(examplesEl);
  }

  // Test input
  const testEl = document.createElement('div');
  testEl.className = 'card-test';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type to test\u2026';

  const indicator = document.createElement('span');
  indicator.className = 'test-indicator';

  input.addEventListener('input', () => {
    if (!regex || input.value === '') {
      input.classList.remove('test-match', 'test-no-match');
      indicator.textContent = '';
      return;
    }
    const matches = regex.test(input.value);
    input.classList.toggle('test-match', matches);
    input.classList.toggle('test-no-match', !matches);
    indicator.textContent = matches ? '\u2705' : '\u274C';
  });

  testEl.appendChild(input);
  testEl.appendChild(indicator);
  card.appendChild(testEl);

  return card;
}

function updateCount() {
  const visible = cardsEl.querySelectorAll('.card:not([hidden])').length;
  countEl.textContent = `${visible} of ${patterns.length} patterns`;
}

function applyFilters() {
  const query = searchEl.value.toLowerCase();
  const category = categoryEl.value;

  for (const card of cardsEl.children) {
    const matchesSearch =
      !query || card.dataset.name.includes(query) || card.dataset.description.includes(query);
    const matchesCategory = !category || card.dataset.category === category;
    card.hidden = !(matchesSearch && matchesCategory);
  }

  updateCount();
  updateHash();
}

let debounceTimer;
searchEl.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applyFilters, 150);
});
categoryEl.addEventListener('change', applyFilters);

function updateHash() {
  const params = new URLSearchParams();
  if (searchEl.value) params.set('search', searchEl.value);
  if (categoryEl.value) params.set('category', categoryEl.value);
  const hash = params.toString();
  history.replaceState(null, '', hash ? `#${hash}` : location.pathname);
}

function restoreFromHash() {
  if (!location.hash) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const search = params.get('search');
  const category = params.get('category');
  if (search) searchEl.value = search;
  if (category) categoryEl.value = category;
}

async function init() {
  const res = await fetch('patterns.json');
  patterns = await res.json();

  // Populate category dropdown
  const categories = [...new Set(patterns.map(p => p.category))].sort();
  for (const cat of categories) {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = patterns.find(p => p.category === cat).categoryTitle;
    categoryEl.appendChild(opt);
  }

  // Render cards
  const fragment = document.createDocumentFragment();
  for (const entry of patterns) {
    fragment.appendChild(createCard(entry));
  }
  cardsEl.appendChild(fragment);

  restoreFromHash();
  applyFilters();
}

init();
