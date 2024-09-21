let taskList = document.getElementById("task-list");

function AddTask() {
    let task = window.prompt("Please enter a task:");

    if (task != "" && task != null) {
        let item = "<div class='item'>\n<p>" + task + "</p>\n<button class='close-button' onclick='RemoveTask(this)'>x</button>\n</div>";
        taskList.innerHTML += item;
    } 
}

function RemoveTask(button) {
    let item = button.parentElement;
    item.remove();
}