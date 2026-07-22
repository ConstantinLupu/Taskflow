const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let total = 0;
let completed = 0;

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Introdu o activitate!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${text}</span>

        <div class="actions">
            <button class="complete">✔</button>
            <button class="delete">🗑</button>
        </div>
    `;

    taskList.appendChild(li);

    total++;
    updateCounters();

    taskInput.value = "";
    taskInput.focus();

}
function updateCounters() {

    totalTasks.textContent = total;
    completedTasks.textContent = completed;

}