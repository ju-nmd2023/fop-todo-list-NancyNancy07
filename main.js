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
      checkButton.addEventListener("click", () => {
        task.completed = !task.completed;
        localStorage.todo = JSON.stringify(todoArray);
        displayTask();
      });
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
      removeButton.addEventListener("click", (event) => {
        let removeIndex = todoArray.indexOf(task);
        todoArray.splice(removeIndex, 1);
        localStorage.todo = JSON.stringify(todoArray);
        displayTask();
      });
      divElement.appendChild(removeButton);

      containerElement.appendChild(divElement);
    }
  }
}

function clickHandler() {
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
  buttonElement.addEventListener("click", clickHandler);
  displayTask();
}

window.addEventListener("load", loadHandler);
