const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const tableBody = document.querySelector("#taskTable tbody");

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  updateTable();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const time = timeInput.value;
  const date = new Date().toLocaleDateString();

  if (!task || !time) return;

  const taskData = { task, time, date, done: false };
  tasks.push(taskData);
  saveTasks();
  updateTable();

  taskInput.value = "";
  timeInput.value = "";
});

function addTaskToTable(taskData, index) {
  const row = document.createElement("tr");
  if (taskData.done) row.classList.add("done");

  row.innerHTML = `
    <td>${taskData.task}</td>
    <td>${taskData.time}</td>
    <td>${taskData.date}</td>
    <td>
      <button class="done-btn">${taskData.done ? "Desfazer" : "Concluir"}</button>
    </td>
  `;

  const doneButton = row.querySelector(".done-btn");
  doneButton.addEventListener("click", () => {
    if (taskData.done) {
      // Se a tarefa estiver concluída, o botão "Desfazer" a remove da lista
      tasks.splice(index, 1); // Remove do array
    } else {
      // Marca como concluída
      taskData.done = true;
    }

    saveTasks();
    updateTable();
  });

  tableBody.appendChild(row);
}

function updateTable() {
  tableBody.innerHTML = "";
  tasks.forEach((task, index) => addTaskToTable(task, index));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
