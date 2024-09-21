let todoTaskList = document.getElementById("todo-task-list");
let doingTaskList = document.getElementById("doing-task-list");
let doneTaskList = document.getElementById("done-task-list");

function AddTask() {
    let task = window.prompt("Please enter a task:");

    if (task != "" && task != null) {
        let item = `<div class="item">
            <p>${task}</p>
            <div class="buttons">
                <button class="up-button" onclick="MoveTaskUp(this)">/\\</button>
                <button class="close-button" onclick="RemoveTask(this)">x</button>
                <button class="down-button" onclick="MoveTaskDown(this)">\\/</button>
                <button class="move-button" onclick="MoveTaskToNextLayer(this)">></button>
            </div>
        </div>`;
        todoTaskList.innerHTML += item;
    }
}

function RemoveTask(button) {
    let item = button.parentElement.parentElement;
    item.remove();
}

function MoveTaskToNextLayer(button) {
    let item = button.parentElement.parentElement;
    let id = item.parentElement.getAttribute('id');

    if (id == "todo-task-list") {
        doingTaskList.appendChild(item);
    }
    else if (id == "doing-task-list") {
        doneTaskList.appendChild(item);
    }
}

function MoveTaskUp(button) {
    let item = button.parentElement.parentElement;
    let parent = item.parentElement;
    console.log(parent);
    for (let index = 2; index < parent.children.length; index++) {
        console.log(index);
        if (parent.children[index] == item) {
            let temp = parent.children[index-1].innerHTML;
            parent.children[index-1].innerHTML = item.innerHTML;
            parent.children[index].innerHTML = temp;
        }
    }
}

function MoveTaskDown(button) {
    let item = button.parentElement.parentElement;
    let parent = item.parentElement;
    console.log(parent);
    for (let index = 1; index < parent.children.length-1; index++) {
        console.log(index);
        if (parent.children[index] == item) {
            let temp = parent.children[index+1].innerHTML;
            parent.children[index+1].innerHTML = item.innerHTML;
            parent.children[index].innerHTML = temp;
        }
    }
}