
document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const subjectInput = document.getElementById("subjectInput");
  const dateInput = document.getElementById("dateInput");
  const taskList = document.getElementById("taskList");
  const emptyMessage = document.getElementById("emptyMessage");
  const addBtn = document.getElementById("addBtn");

  let tasks = [];

  try {
    tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
  } catch (e) {
    tasks = [];
  }

  function renderTasks() {
    taskList.innerHTML = "";
    document.getElementById("total").textContent = tasks.length;
    document.getElementById("completed").textContent =
      tasks.filter(t => t.completed).length;
    emptyMessage.style.display = tasks.length ? "none" : "block";

    tasks.forEach(task => {
      const item = document.createElement("div");
      item.className = "task-item" + (task.completed ? " done" : "");

      const info = document.createElement("div");
      info.className = "task-info";

      const title = document.createElement("h3");
      title.textContent = task.title;

      const subject = document.createElement("p");
      subject.textContent = "📘 " + task.subject;

      const date = document.createElement("p");
      date.textContent = "📅 " + (task.date || "No due date");

      info.append(title, subject, date);

      const done = document.createElement("button");
      done.textContent = task.completed ? "Undo" : "✓ Done";
      done.className = "complete-btn";
      done.onclick = function () {
        task.completed = !task.completed;
        saveAndRender();
      };

      const del = document.createElement("button");
      del.textContent = "Delete";
      del.className = "delete-btn";
      del.onclick = function () {
        tasks = tasks.filter(t => t.id !== task.id);
        saveAndRender();
      };

      item.append(info, done, del);
      taskList.appendChild(item);
    });
  }

  function saveAndRender() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
    renderTasks();
  }

  addBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const title = taskInput.value.trim();
    const subject = subjectInput.value.trim();

    if (!title || !subject) {
      alert("Please enter task name and subject.");
      return;
    }

    tasks.push({
      id: Date.now(),
      title: title,
      subject: subject,
      date: dateInput.value,
      completed: false
    });

    saveAndRender();

    taskInput.value = "";
    subjectInput.value = "";
    dateInput.value = "";
  });

  renderTasks();
  console.log("Study Planner ready");
});