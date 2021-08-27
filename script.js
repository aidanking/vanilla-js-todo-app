(() => {
  const addTodoForm = document.querySelector('.add-todo-form');
  const addTodoInput = document.querySelector('.add-todo-input');
  const todosFilter = document.querySelector('.todo-filter');
  let todos = [];
  let filter = 'all';
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
    updateTodoCount();
  }

  function toogleTodo(e) {
    const { target } = e;
    const todoListItem = target.parentElement.parentElement.parentElement;
    const todoId = Number(todoListItem.dataset.todoId);
    const label = todoListItem.querySelector('label');

    todos = todos.map((x) => {
      if (x.id === todoId) {
        return { ...x, isDone: !x.isDone };
      }

      return x;
    });

    label.classList.toggle('done');
    updateTodoCount();
  }

  function addEditForm(e) {
    const { target } = e;

    const todoElement = target.parentElement.parentElement;
    const todoListItem = todoElement.parentElement;
    const todoId = Number(todoListItem.dataset.todoId);
    const todo = todos.find((x) => x.id === todoId);

    todoElement.remove();
    todoListItem.append(todoEditForm(todo));
  }

  function editTodo(e) {
    const { target } = e;

    const input = target.querySelector('input');
    const { value } = input;
    const todoListItem = target.parentElement;
    const todoId = Number(todoListItem.dataset.todoId);
    const todo = todos.find((x) => x.id === todoId);

    todo.name = value;

    target.remove();

    todoListItem.append(todoElement(todo));
  }

  function deleteTodo(e) {
    const { target } = e;

    const todoListItemToBeDeleted =
      target.parentElement.parentElement.parentElement;
    const { todoId } = todoListItemToBeDeleted.dataset;

    todos = todos.filter((x) => x.id !== Number(todoId));

    todoListItemToBeDeleted.remove();
    updateTodoCount();
  }

  function filterTodos(e) {
    const { target } = e;
    const todosListElement = document.querySelector('.todos');
    const todosListFragment = document.createDocumentFragment();

    removeChildElements(todosListElement);

    filter = target.value;

    if (filter === 'done') {
      addTodoInput.disabled = true;
    } else {
      addTodoInput.disabled = false;
    }

    getTodosForFilter(filter).forEach((todo) => {
      todosListFragment.append(todoListItem(todo));
    });

    todosListElement.append(todosListFragment);
    updateTodoCount();
  }

  function removeChildElements(element) {
    let current = element.firstElementChild;

    while (current) {
      let temp = current;
      current = current.nextElementSibling;
      temp.remove();
    }
  }

  function getTodosForFilter(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'todo') {
      return todos.filter((x) => !x.isDone);
    } else if (filter === 'done') {
      return todos.filter((x) => x.isDone);
    }

    return todos;
  }

  function updateTodoCount() {
    const countHeader = document.querySelector('.todo-count');
    const count = todos.filter((x) => !x.isDone).length;

    countHeader.textContent = `${count} Todos Left`;
  }

  function todoListItem(todo) {
    const todoListItem = document.createElement('li');

    todoListItem.dataset.todoId = todo.id;
    todoListItem.append(todoElement(todo));

    return todoListItem;
  }

  function todoElement(todo) {
    const todoElement = document.createElement('div');

    todoElement.className = 'todo';
    todoElement.append(todoCheckboxContainer(todo), todoButtonContainer(todo));

    return todoElement;
  }

  function todoCheckboxContainer(todo) {
    const todoCheckboxContainer = document.createElement('div');
    todoCheckboxContainer.className = 'todo-checkbox-container';

    todoCheckboxContainer.append(todoCheckbox(todo), todoCheckboxLabel(todo));

    return todoCheckboxContainer;
  }

  function todoCheckboxLabel(todo) {
    const label = document.createElement('label');

    label.innerText = todo.name;
    label.htmlFor = `todo-${todo.id}`;

    if (todo.isDone) {
      label.className = 'done';
    } else {
      label.className = '';
    }

    return label;
  }

  function todoCheckbox(todo) {
    const checkbox = document.createElement('input');

    checkbox.id = `todo-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isDone;
    checkbox.addEventListener('change', toogleTodo);

    return checkbox;
  }

  function todoButtonContainer(todo) {
    const todoButtonContainer = document.createElement('div');
    todoButtonContainer.className = 'todo-button-container';

    todoButtonContainer.append(todoEditButton(), todoDeleteButton());

    return todoButtonContainer;
  }

  function todoEditButton() {
    const editButton = document.createElement('button');

    editButton.innerText = 'Edit Button';

    editButton.addEventListener('click', addEditForm);

    return editButton;
  }

  function todoDeleteButton() {
    const deleteButton = document.createElement('button');

    deleteButton.innerText = 'Delete Todo';

    deleteButton.addEventListener('click', deleteTodo);

    return deleteButton;
  }

  function todoEditForm(todo) {
    const form = document.createElement('form');

    form.addEventListener('submit', editTodo);

    const input = document.createElement('input');
    input.value = todo.name;
    form.append(input);

    return form;
  }

  addTodoForm.addEventListener('submit', addTodo);
  todosFilter.addEventListener('change', filterTodos);
})();
