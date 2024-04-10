function doneTask(event) {
  const doneTask = event.target.parentNode.childNodes[1].innerText;
  // event.target.innerText = "✔️";
  let todoArray = JSON.parse(localStorage.todo);
  // for (let task of todoArray) {
  //   if (task.name === doneTask) {
  //     task.completed = true;
  //   }
  // }
  let doneTaskIndex;
  todoArray.findIndex(function (event, index) {
    if (event.name === doneTask) {
      return (doneTaskIndex = index);
    }
  });
  if (doneTaskIndex !== -1) {
    todoArray[doneTaskIndex].completed = true;
  }
  localStorage.todo = JSON.stringify(todoArray);
  displayTask();
}
function removeTask(event) {
  const taskName = event.target.parentNode.childNodes[1].innerText;
  let todoArray = JSON.parse(localStorage.todo);
  // finding the index of selected task
  const taskIndex = todoArray.findIndex(function (event) {
    return event.name === taskName;
  });
  if (taskIndex !== -1) {
    todoArray.splice(taskIndex, 1);
  }
  localStorage.todo = JSON.stringify(todoArray);
  displayTask();
}
function displayTask() {
  if (localStorage.todo !== undefined) {
    let todoArray = JSON.parse(localStorage.todo);
    const containerElement = document.getElementById("taskContainer");
    containerElement.innerText = "";

    for (let task of todoArray) {
      const divElement = document.createElement("div");
      divElement.classList.add("bgColor");

      divElement.classList.add("li");

      const checkButton = document.createElement("button");
      checkButton.classList.add("bgColor");
      if (task.completed === true) {
        checkButton.innerText = "✔️";
      } else {
        checkButton.innerText = "⬜";
      }
      checkButton.addEventListener("click", doneTask);
      divElement.appendChild(checkButton);

      const listElement = document.createElement("p");
      listElement.innerText = task.name;
      if (task.completed === true) {
        listElement.classList.add("lineThrough");
      }
      divElement.appendChild(listElement);

      const removeButton = document.createElement("button");
      removeButton.innerText = "❌";
      removeButton.classList.add("bgColor");
      removeButton.addEventListener("click", removeTask);
      divElement.appendChild(removeButton);

      containerElement.appendChild(divElement);
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
    name: inputValue,
    completed: false,
  };
  if (localStorage.todo === undefined) {
    localStorage.todo = JSON.stringify([]);
  }

  if (localStorage.todo !== undefined && inputElement.value !== "") {
    let todoArray = JSON.parse(localStorage.todo);
    todoArray.push(todoTask);
    localStorage.todo = JSON.stringify(todoArray);
    inputElement.value = "";
  }

  displayTask();
}

function loadHandler() {
  const buttonElement = document.getElementById("addButton");
  buttonElement.addEventListener("click", saveTask);
  displayTask();
}
// window.addEventListener("storage", onClickHandler);
window.addEventListener("load", loadHandler);
