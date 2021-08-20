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
      isDone: false,
    };

    todos.push(todo);
    addTodoElement(todo);
  }

  function addTodoElement(todo) {
    const todosElement = document.querySelector('.todos');

    todosElement.append(createTodoElement(todo));
    addTodoForm.reset();
  }

  function createTodoElement(todo) {
    const todoElement = document.createElement('li');
    todoElement.append(createTodoCheckboxContainer(todo));
    todoElement.append(createDeleteButton());
    todoElement.className = 'todo';
    todoElement.dataset.todoId = todo.id;

    return todoElement;
  }

  function createTodoCheckboxContainer(todo) {
    const todoCheckboxContainer = document.createElement('div');

    todoCheckboxContainer.append(createTodoCheckboxLabel(todo));
    todoCheckboxContainer.append(createTodoCheckbox(todo));

    return todoCheckboxContainer;
  }

  function createTodoCheckboxLabel(todo) {
    const label = document.createElement('label');
    label.innerText = todo.name;
    label.htmlFor = `todo-${todo.id}`;

    return label;
  }

  function createTodoCheckbox(todo) {
    const checkbox = document.createElement('input');
    checkbox.id = `todo-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toogleTodo);

    return checkbox;
  }

  function toogleTodo(e) {
    const { target } = e;
    const todoElement = target.parentElement.parentElement;
    const todoId = Number(todoElement.dataset.todoId);
    const label = todoElement.querySelector('label');

    todos = todos.map((x) => {
      if (x.id === todoId) {
        return { ...x, isDone: !x.isDone };
      }

      return x;
    });

    label.classList.toggle('done');
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
