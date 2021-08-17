(() => {
  const addTodoForm = document.querySelector('.add-todo-form');
  const addTodoInput = document.querySelector('.add-todo-input');
  const todosElement = document.querySelector('.todos');
  const todos = [];

  function addTodo(e) {
    e.preventDefault();

    const todo = {
      name: addTodoInput.value,
    };

    todos.push(todo);
    addTodoElement(todo);
  }

  function addTodoElement(todo) {
    const todosElement = document.querySelector('.todos');
    const todoElement = document.createElement('li');
    todoElement.innerText = todo.name;

    todosElement.append(todoElement);
    addTodoInput.value = '';
  }

  addTodoForm.addEventListener('submit', addTodo);
})();
