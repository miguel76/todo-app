const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

const STORAGE_KEY = 'theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY) || LIGHT_THEME;
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

function applyTheme(theme) {
  if (theme === LIGHT_THEME) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  updateThemeToggleButton(theme);
}

function updateThemeToggleButton(theme) {
  themeToggle.textContent = theme === DARK_THEME ? '☀️' : '🌙';
}

function toggleTheme() {
  const currentTheme = getStoredTheme();
  const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
  applyTheme(newTheme);
  saveTheme(newTheme);
}

function initTheme() {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
}

function createTodoItem(text) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    li.remove();
  });

  li.append(span, deleteButton);
  return li;
}

themeToggle.addEventListener('click', toggleTheme);

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = todoInput.value.trim();
  if (!value) {
    return;
  }

  const todoItem = createTodoItem(value);
  todoList.appendChild(todoItem);
  todoInput.value = '';
  todoInput.focus();
});

initTheme();
