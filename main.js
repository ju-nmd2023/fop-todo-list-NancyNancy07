function removeTask(event) {
  const removedTaskName = event.target.parentNode.innerText;
  let todoArray = JSON.parse(localStorage.todo);

  // Find the index of the task to remove
  const taskIndex = todoArray.findIndex(
    (task) => task.name === removedTaskName
  );

  // Remove the task from the array
  if (taskIndex !== -1) {
    todoArray.splice(taskIndex, 1);

    // Update the localStorage
    localStorage.todo = JSON.stringify(todoArray);

    // Update the display
    displayTask();
  }
}
function displayTask() {
  if (localStorage.todo !== undefined) {
    let todoArray = JSON.parse(localStorage.todo);
    const containerElement = document.getElementById("taskContainer");
    containerElement.innerText = "";
    for (let task of todoArray) {
      const listElement = document.createElement("div");
      listElement.innerText = task.name;
      listElement.classList.add("li");
      containerElement.appendChild(listElement);

      const checkButton = document.createElement("button");
      checkButton.innerText = "✔️";
      listElement.appendChild(checkButton);
      const removeButton = document.createElement("button");
      removeButton.innerText = "❌";
      removeButton.addEventListener("click", removeTask);
      listElement.appendChild(removeButton);
    }

    const inputElement = document.getElementById("inputValue");
    const task = inputElement.value;
    const taskIndex = todoArray.indexOf(task);
    todoArray.splice(taskIndex, 1);
  }
}
function saveTask() {
  const inputElement = document.getElementById("inputValue");
  const inputValue = inputElement.value;
  let todoTask = {
    name: inputElement.value,
    done: false,
  };

  if (localStorage.todo === undefined) {
    localStorage.todo = JSON.stringify([]);
  }
  let todoArray = JSON.parse(localStorage.todo);
  todoArray.push(todoTask);
  localStorage.todo = JSON.stringify(todoArray);
  inputElement.value = "";

  displayTask();
}

function loadHandler() {
  const buttonElement = document.getElementById("addButton");
  buttonElement.addEventListener("click", saveTask);
  displayTask();
}
// window.addEventListener("storage", onClickHandler);
window.addEventListener("load", loadHandler);
