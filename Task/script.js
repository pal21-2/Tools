const addInput = document.getElementById('add');
const infInput = document.getElementById('inf');
const setBtn = document.getElementById('set');
const todoDiv = document.getElementById('Todo');

// Todoを保存する関数  
function saveTodos() {
  const todos = [];
  document.querySelectorAll('.todo-item').forEach(item => {
    const title = item.querySelector('h3').textContent;
    const content = item.querySelector('p').textContent;
    todos.push({ title, content });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Todoを読み込む関数  
function loadTodos() {
  const todosStr = localStorage.getItem('todos');
  if (todosStr) {
    try {
      const todos = JSON.parse(todosStr);
      todos.forEach(todo => {
        addTodoItem(todo.title, todo.content);
      });
    } catch (e) {
      console.error('読み込みエラー', e);
    }
  }
}

// 追加ボタンのクリック  
setBtn.addEventListener('click', () => {
  const title = addInput.value.trim();
  const content = infInput.value.trim();
  if (title === '' && content === '') return;

  addTodoItem(title, content);
  addInput.value = '';
  infInput.value = '';
  addInput.focus();

  saveTodos(); // 追加後に保存  
});

// Enterキーでも追加  
addInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    setBtn.click();
  }
});
infInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    setBtn.click();
  }
});

// Todoアイテム追加関数  
function addTodoItem(title, content) {
  const item = document.createElement('div');
  item.className = 'todo-item';

  const titleElem = document.createElement('h3');
  titleElem.textContent = title || '無題';

  const contentElem = document.createElement('p');
  contentElem.textContent = content || '';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.className = 'delete';

  // 削除動作  
  deleteBtn.onclick = () => {
    todoDiv.removeChild(item);
    saveTodos(); // 削除後に保存  
  };

  item.appendChild(titleElem);
  item.appendChild(contentElem);
  item.appendChild(deleteBtn);

  todoDiv.appendChild(item);
}

// ページ読み込み時に復元  
loadTodos();
