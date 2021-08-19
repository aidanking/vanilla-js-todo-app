(() => {
  const addTodoForm = document.querySelector('.add-todo-form');
  const addTodoInput = document.querySelector('.add-todo-input');
  let todos = [];
  let maxId = 0;

  function addTodo(e) {
    e.preventDefault();
    maxId++;

    const todo = {
      id: maxId,
      name: addTodoInput.value,
    };

    todos.push(todo);
    addTodoElement(todo);
  }

  function addTodoElement(todo) {
    const todosElement = document.querySelector('.todos');
    const todoElement = document.createElement('li');

    todoElement.innerText = todo.name;
    todoElement.append(createDeleteButton());
    todoElement.className = 'todo';
    todoElement.dataset.todoId = todo.id;

    todosElement.append(todoElement);
    addTodoForm.reset();
  }

  function createDeleteButton() {
    const deleteButton = document.createElement('button');

    deleteButton.innerText = 'Delete Todo';

    deleteButton.addEventListener('click', deleteTodo);

    return deleteButton;
  }

  function deleteTodo(e) {
    const { target } = e;

    const todoElementToBeDeleted = target.parentElement;
    const { todoId } = todoElementToBeDeleted.dataset;

    todos = todos.filter((x) => x.id !== Number(todoId));

    todoElementToBeDeleted.remove();
  }

  addTodoForm.addEventListener('submit', addTodo);
})();
