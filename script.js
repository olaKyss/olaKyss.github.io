const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Вивчити HTML', completed: true },
  { id: 2, text: 'Вивчити CSS', completed: true },
  { id: 3, text: 'Вивчити JavaScript', completed: false },
];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const todoText = prompt('Enter your new TASK:');
  if (todoText) {
      const newTodo = {id: Date.now(), text: todoText, completed: false,};
      todos.push(newTodo);
      render();
      updateCounter();
      saveTodos();
  }
}

function renderTodo(todo) {
  return `
  <li class="list-group-item">
    <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.completed ? 'checked' : ''} onchange="checkTodo(${todo.id})"/>
    <label for="${todo.id}"><span class="${todo.completed ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
    <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
  </li>
`;
}

function render() {
  list.innerHTML = '';
  todos.forEach(todo => {
    list.insertAdjacentHTML('beforeend', renderTodo(todo));
  });
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.completed).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveTodos();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
      todo.completed = !todo.completed;
      render();
      updateCounter();
      saveTodos();
  }
}

render();
updateCounter();
