function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDate");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        var currentDate = new Date();
        var dueDate = new Date(dueDateInput.value);
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" onchange="toggleTaskCompletion(event)">
            <span>${taskInput.value}</span>
            <span class="due-date">${dueDateInput.value}</span>
            <button class="delete" onclick="deleteTask(event)">Delete</button>
        `;

        if (dueDate < currentDate) {
            li.classList.add("overdue");
        }

        taskList.appendChild(li);
        updateLocalStorage();
        taskInput.value = "";
        dueDateInput.value = "";
    }
}

function toggleTaskCompletion(event) {
    var li = event.target.parentNode;
    li.classList.toggle('completed');
    updateLocalStorage();
}

function deleteTask(event) {
    var li = event.target.parentNode;
    li.remove();
    updateLocalStorage();
}

document.addEventListener('DOMContentLoaded', loadTasks);

function updateLocalStorage() {
    var tasks = document.getElementById('taskList').innerHTML;
    localStorage.setItem('tasks', tasks);
}

function loadTasks() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        document.getElementById('taskList').innerHTML = savedTasks;
    }
}
