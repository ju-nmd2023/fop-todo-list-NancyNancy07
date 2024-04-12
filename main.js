// function doneTask() {
//   const doneTaskContainer = document.getElementById("taskContainer");
//   const doneTaskElement = this.parentNode;
//   const taskIndex = Array.from(doneTaskContainer.children).indexOf(
//     doneTaskElement
//   );

//   let todoArray = JSON.parse(localStorage.todo);
//   todoArray.findIndex(function (event, index) {
//     if (taskIndex === index) {
//       event.completed = true;
//     }
//   });

//   // for (let index in todoArray) {
//   //   console.log(typeof index);
//   //   if (index === taskIndex) {
//   //     console.log("done");
//   //   }
//   // }
//   // for (let i = 0; i < todoArray.length; i++) {
//   //   console.log(i);

//   //   if (todoArray[i] === doneTask) {
//   //     // Comparing the task name
//   //     todoArray[i].completed = true;
//   //   }
//   // }
//   // let doneTaskIndex;

//   // if (doneTaskIndex !== -1) {
//   //   todoArray[doneTaskIndex].completed = true;
//   // }
//   localStorage.todo = JSON.stringify(todoArray);
//   displayTask();
// }
function removeTask(event) {
  const taskName = event.target.parentNode.childNodes[1].innerText;

  let todoArray = JSON.parse(localStorage.todo);
  // finding the index of selected task
  let taskIndex;
  todoArray.findIndex(function (event, index) {
    if (event.name === taskName) {
      return (taskIndex = index);
    }
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
      //checkButton.addEventListener("click", doneTask);
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
      // removeButton.addEventListener("click", removeTask);
      removeButton.addEventListener("click", (event) => {
        let removeIndex = todoArray.indexOf(task);
        todoArray.splice(removeIndex, 1);
        localStorage.todo = JSON.stringify(todoArray);
        displayTask();
      });
      divElement.appendChild(removeButton);

      containerElement.appendChild(divElement);
    }

    // const inputElement = document.getElementById("inputValue");
    // const task = inputElement.value;
    // const taskIndex = todoArray.indexOf(task);
    // todoArray.splice(taskIndex, 1);
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
