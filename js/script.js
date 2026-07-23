// ==============================
// TASKFLOW
// ==============================

// Elemente HTML
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Lista task-urilor
let tasks = [];

// ==============================
// ÎNCĂRCARE DIN LOCAL STORAGE
// ==============================

loadTasks();

// ==============================
// EVENIMENTE
// ==============================

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// ==============================
// ADAUGĂ TASK
// ==============================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Introdu o activitate!");

        taskInput.focus();

        return;
    }

    tasks.push({

        text: text,
        completed: false

    });

    taskInput.value = "";

    saveTasks();

    render();

    taskInput.focus();

}

// ==============================
// AFIȘARE TASKURI
// ==============================

function render() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <li class="empty">
                Nu există activități.
            </li>
        `;

    } else {

        tasks.forEach((task, index) => {

            const li = document.createElement("li");

            li.innerHTML = `

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

                <div class="actions">

                    <button class="complete">
                        ${task.completed ? "↩️" : "✅"}
                    </button>

                    <button class="delete">
                        🗑️
                    </button>

                </div>

            `;

            // Finalizare task
            li.querySelector(".complete").addEventListener("click", function () {

                tasks[index].completed = !tasks[index].completed;

                saveTasks();

                render();

            });

            // Ștergere task
            li.querySelector(".delete").addEventListener("click", function () {

                if (confirm("Ștergi această activitate?")) {

                    tasks.splice(index, 1);

                    saveTasks();

                    render();

                }

            });

            taskList.appendChild(li);

        });

    }

    updateStatistics();

}

// ==============================
// ACTUALIZARE STATISTICI
// ==============================

function updateStatistics() {

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = tasks.filter(task => task.completed).length;

}

// ==============================
// SALVARE
// ==============================

function saveTasks() {

    localStorage.setItem("taskflow", JSON.stringify(tasks));

}

// ==============================
// ÎNCĂRCARE
// ==============================

function loadTasks() {

    const saved = localStorage.getItem("taskflow");

    if (saved) {

        tasks = JSON.parse(saved);

    }

    render();

}