// taskStatus = 0: "todo", 1: "doing", 2: "done"
var tasks = [["Finish This Website."], [], []];
var taskListElements = [
    document.getElementById("todo-task-list"), 
    document.getElementById("doing-task-list"),
    document.getElementById("done-task-list")
];

function GetItemFormat(task) {
    return `<div class="item">
        <p>${task}</p>
        <div class="buttons">
            <img src="icons/settings.svg">
            <button class="up-button actions" onclick="MoveTaskUp(this)">
                <img src="icons/arrow_up.svg"> Move Up
            </button>
            <button class="down-button actions" onclick="MoveTaskDown(this)">
                <img src="icons/arrow_down.svg"> Move Down
            </button>
            <button class="move-button actions" onclick="MoveTaskToNextStatus(this)">
                <img src="icons/arrow_right.svg"> Update Status
            </button>
            <button class="move-button actions" onclick="MoveTaskToPreviousStatus(this)">
                <img src="icons/arrow_left.svg"> Revert Status
            </button>
            <button class="close-button actions" onclick="RemoveTaskButton(this)">
                <img src="icons/close.svg"> Remove
            </button>
        </div>
    </div>`;
}

function AddTask(task, taskStatus) {
    if (task != "" && task != null) {
        tasks[taskStatus].push(task);
        Update();
        Save();
    }
}

function AddTaskFromPrompt() {
    let task = window.prompt("Please enter a task:");
    AddTask(task, 0);
}

function AddTasksFromList(list, taskStatus) {
    if (list == null) return;
    for (let i = 0; i < list.length; i++) {
        AddTask(list[i], taskStatus);
    }
}

function RemoveTask(task, taskStatus) {
    let index = tasks[taskStatus].indexOf(task);
    tasks[taskStatus].splice(index, 1);
    Update();
    Save();
}

function RemoveTaskButton(button) {
    let parent = button.parentElement.parentElement;
    let task = parent.children[0].innerHTML;
    let taskStatus = parent.parentElement.getAttribute("data-status");
    RemoveTask(task, taskStatus);
}

function SwapTask(index1, index2, taskStatus) {
    let temp = tasks[taskStatus][index1];
    tasks[taskStatus][index1] = tasks[taskStatus][index2];
    tasks[taskStatus][index2] = temp;
    Update();
}

function MoveTaskUp(button) {
    let item = button.parentElement.parentElement;
    let task = item.children[0].innerHTML;
    let status = item.parentElement.getAttribute("data-status");
    let index = tasks[status].indexOf(task);
    if (index == 0) return;
    SwapTask(index, index-1, status);
}

function MoveTaskDown(button) {
    let item = button.parentElement.parentElement;
    let task = item.children[0].innerHTML;
    let status = item.parentElement.getAttribute("data-status");
    let index = tasks[status].indexOf(task);
    if (index+1 == tasks[status].length) return;
    SwapTask(index, index+1, status);
}

function MoveTaskToNextStatus(button) {
    let item = button.parentElement.parentElement;
    let task = item.children[0].innerHTML;
    let status = parseInt(item.parentElement.getAttribute("data-status"));
    if (status == 2) return;
    AddTask(task, status+1);
    RemoveTask(task, status);
}

function MoveTaskToPreviousStatus(button) {
    let item = button.parentElement.parentElement;
    let task = item.children[0].innerHTML;
    let status = parseInt(item.parentElement.getAttribute("data-status"));
    if (status == 0) return;
    AddTask(task, status-1);
    RemoveTask(task, status);
}

function ReadLists() {
    console.log(tasks);
}

function Save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function Load() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks == null) {
        tasks = [[], [], []];
    }
    Update();
}

function Update() {
    for (let i = 0; i < 3; i++) {
        taskListElements[i].innerHTML = "";
        for (let j = 0; j < tasks[i].length; j++) {
            taskListElements[i].innerHTML += GetItemFormat(tasks[i][j]);
        }
    }
}

window.onload = Load();
document.addEventListener("keypress", function(event) {
    if (event.key == 'n' || event.key == 'N') AddTaskFromPrompt();
});