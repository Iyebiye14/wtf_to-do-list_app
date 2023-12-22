const addTodoInput = document.getElementById("add-input-field");
const todoList = document.querySelector(".todo-list");
const form = document.querySelector(".add-todo-form");
const addBtn = document.getElementById("add-todo-btn");
const saveEditBtn = document.getElementById("save-edit-btn");
const errorDiv = document.querySelector(".error-container");
let editedTodoItem;

const editIcon = `
<svg id="edit-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 20.0001V21.0001C8.26522 21.0001 8.51957 20.8947 8.70711 20.7072L8 20.0001ZM4 20.0001H3C3 20.5524 3.44772 21.0001 4 21.0001V20.0001ZM4 16.0001L3.29289 15.293C3.10536 15.4805 3 15.7349 3 16.0001H4ZM15.2929 4.7072L16 5.41431L16 5.41431L15.2929 4.7072ZM16.7071 4.7072L16 5.41431L16 5.41431L16.7071 4.7072ZM19.2929 7.29299L20 6.58588V6.58588L19.2929 7.29299ZM19.2929 8.7072L18.5858 8.00009L19.2929 8.7072ZM8 19.0001H4V21.0001H8V19.0001ZM5 20.0001V16.0001H3V20.0001H5ZM4.70711 16.7072L16 5.41431L14.5858 4.00009L3.29289 15.293L4.70711 16.7072ZM16 5.41431L18.5858 8.00009L20 6.58588L17.4142 4.00009L16 5.41431ZM18.5858 8.00009L7.29289 19.293L8.70711 20.7072L20 9.41431L18.5858 8.00009ZM18.5858 8.00009V8.00009L20 9.41431C20.781 8.63326 20.781 7.36693 20 6.58588L18.5858 8.00009ZM16 5.41431H16L17.4142 4.00009C16.6332 3.21904 15.3668 3.21904 14.5858 4.00009L16 5.41431Z" fill="#14181F"/>
<path d="M12 8L16 12" sdtroke="#14181F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

const deleteIcon = `<svg id="delete-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 10L14 17" stroke="#14181F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 10L10 17" stroke="#14181F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6V5C5.44772 5 5 5.44772 5 6H6ZM18 6H19C19 5.44772 18.5523 5 18 5V6ZM6 7H18V5H6V7ZM17 6V20H19V6H17ZM17 20H7V22H17V20ZM7 20V6H5V20H7ZM7 20H7H5C5 21.1046 5.89543 22 7 22V20ZM17 20V22C18.1046 22 19 21.1046 19 20H17Z" fill="#14181F"/>
<path d="M4 6H20" stroke="#14181F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 6V7C16.5523 7 17 6.55228 17 6H16ZM8 6H7C7 6.55228 7.44772 7 8 7V6ZM9 4H15V2H9V4ZM15 4V6H17V4H15ZM16 5H8V7H16V5ZM9 6V4H7V6H9ZM15 4H17C17 2.89543 16.1046 2 15 2V4ZM9 2C7.89543 2 7 2.89543 7 4H9V4V2Z" fill="#14181F"/>
</svg>
`;

const listItemButtons = `<span class="btn-icons">
      <button type="button" class=" btn edit-todo-btn">
      ${editIcon}
      </button>

      <button type="button" class=" btn delete-todo-btn">
      ${deleteIcon}
      </button>
</span>`;

function createListItem(enteredTodo) {
  const listItem = document.createElement("li");

  listItem.innerHTML = `
  <label class=checkbox-container> 
  <input class="check-todo" type="checkbox"> 
  <span class="checkmark"></span>
  </label>
  
  <span class="entered-todo"> 
  ${enteredTodo} 
   </span>`;
  listItem.innerHTML += listItemButtons;
  listItem.classList.add("todo-item");
  todoList.prepend(listItem);
}

function renderError() {
  errorDiv.classList.remove("hidden");

  setTimeout(() => {
    errorDiv.classList.add("hidden");
  }, 4000);
}

function addTodoHandler(e) {
  e.preventDefault();

  let enteredTodo = addTodoInput.value;

  enteredTodo.length <= 0 ? renderError() : createListItem(enteredTodo);
  addTodoInput.value = "";
}

function editTodo(e) {
  let todo = e.target.closest("span").parentElement;
  addTodoInput.value = todo.innerText;
  addBtn.classList.add("hidden");
  saveEditBtn.classList.remove("hidden");
  editedTodoItem = e.target.closest(".todo-item");
}

function saveEditHandler(e) {
  e.preventDefault();
  console.log(editedTodoItem.children);
  editedTodoItem.children[1].textContent = addTodoInput.value;

  setTimeout(() => {
    addTodoInput.value = "";
    addBtn.classList.remove("hidden");
    saveEditBtn.classList.add("hidden");
  }, 3000);
}

function deleteTodo(e) {
  const todoItem = e.target.closest(".todo-item");
  todoItem.remove();
}

function toggleCheckTodo(e) {
  let checkbox;
  const todoItem = e.target.closest(".todo-item");
  console.log(todoItem);

  checkbox = e.target;
  checkbox["checked"]
    ? todoItem.classList.add("todo-done")
    : todoItem.classList.remove("todo-done");
}

todoList.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target && e.target.closest(".edit-todo-btn")) {
    editTodo(e);
  } else if (e.target && e.target.closest(".delete-todo-btn")) {
    deleteTodo(e);
  } else if (e.target && e.target.closest(".checkbox-container")) {
    toggleCheckTodo(e);
  }
});

form.addEventListener("click", function (e) {
  if (e.target && e.target.closest("#add-todo-btn")) {
    addTodoHandler(e);
  }
  if (e.target && e.target.closest("#save-edit-btn")) {
    saveEditHandler(e);
  }
});