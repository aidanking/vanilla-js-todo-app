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

    const todoList = document.querySelector('.todos');

    todoList.append(todoListItem(todo));
    addTodoForm.reset();
  }

  function toogleTodo(e) {
    const { target } = e;
    const todoListItem = target.parentElement.parentElement;
    const todoId = Number(todoListItem.dataset.todoId);
    const label = todoListItem.querySelector('label');

    todos = todos.map((x) => {
      if (x.id === todoId) {
        return { ...x, isDone: !x.isDone };
      }

      return x;
    });

    label.classList.toggle('done');
  }

  function deleteTodo(e) {
    const { target } = e;

    const todoListItemToBeDeleted = target.parentElement;
    const { todoId } = todoListItemToBeDeleted.dataset;

    todos = todos.filter((x) => x.id !== Number(todoId));

    todoListItemToBeDeleted.remove();
  }

  function todoListItem(todo) {
    const todoListItem = document.createElement('li');

    todoListItem.className = 'todo';
    todoListItem.dataset.todoId = todo.id;
    todoListItem.append(todoCheckboxContainer(todo), todoDeleteButton());

    return todoListItem;
  }

  function todoCheckboxContainer(todo) {
    const todoCheckboxContainer = document.createElement('div');

    todoCheckboxContainer.append(todoCheckboxLabel(todo), todoCheckbox(todo));

    return todoCheckboxContainer;
  }

  function todoCheckboxLabel(todo) {
    const label = document.createElement('label');

    label.innerText = todo.name;
    label.htmlFor = `todo-${todo.id}`;

    return label;
  }

  function todoCheckbox(todo) {
    const checkbox = document.createElement('input');

    checkbox.id = `todo-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toogleTodo);

    return checkbox;
  }

  function todoDeleteButton() {
    const deleteButton = document.createElement('button');

    deleteButton.innerText = 'Delete Todo';

    deleteButton.addEventListener('click', deleteTodo);

    return deleteButton;
  }

  addTodoForm.addEventListener('submit', addTodo);
})();
