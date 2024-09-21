let todoTaskList = document.getElementById("todo-task-list");
let doingTaskList = document.getElementById("doing-task-list");
let doneTaskList = document.getElementById("done-task-list");

function AddTask() {
    let task = window.prompt("Please enter a task:");

    if (task != "" && task != null) {
        let item = `<div class="item">
            <p>${task}</p>
            <div class="buttons">
                <button class="move-button" onclick="MoveTask(this)">></button>
                <button class="close-button" onclick="RemoveTask(this)">x</button>
            </div>
        </div>`;
        todoTaskList.innerHTML += item;
    }
}

function RemoveTask(button) {
    let item = button.parentElement.parentElement;
    item.remove();
}

function MoveTask(button) {
    let item = button.parentElement.parentElement;
    let id = item.parentElement.getAttribute('id');

    if (id == "todo-task-list") {
        doingTaskList.appendChild(item);
    }
    else if (id == "doing-task-list") {
        doneTaskList.appendChild(item);
    }
}