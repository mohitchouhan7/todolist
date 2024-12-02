import { format } from "date-fns";
import {
  projectArray,
  addProject,
  removeProject,
  intializeProjectArray,
} from "./task.js";
import { getTask } from "./input.js";
import "./style.css";

const addProjectBtn = document.getElementById("addProject");
const projectList = document.getElementById("projectList");
const main = document.querySelector("main");

let activeProjectWindow;

// Function to update tasks in the main section
function updateTask(index) {
  main.innerHTML = "";
  if (index === -1) {
    return;
  }

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "Add Task";
  addTaskBtn.id = "addTask";
  main.appendChild(addTaskBtn);

  projectArray[index].taskArray.forEach((task, taskIndex) => {
    const taskItem = document.createElement("div");
    const name = document.createElement("h3");
    const detail = document.createElement("p");
    const time = document.createElement("p");
    const priority = document.createElement("p");
    const changeBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    name.textContent = task.name;
    name.className = "taskName";
    detail.textContent = task.detail;
    detail.className = "taskDetail";
    time.textContent = format(task.date, "dd/MM/yyyy");
    priority.textContent = task.priority;
    changeBtn.textContent = task.status;
    deleteBtn.textContent = "Delete";
    taskItem.className = "taskCard";

    taskItem.appendChild(name);
    taskItem.appendChild(time);
    taskItem.appendChild(detail);
    taskItem.appendChild(priority);
    taskItem.appendChild(changeBtn);
    taskItem.appendChild(deleteBtn);
    main.appendChild(taskItem);

    changeBtn.addEventListener("click", () => {
      task.changeStatus();
      changeBtn.textContent = task.status;
    });

    deleteBtn.addEventListener("click", () => {
      main.removeChild(taskItem);
      projectArray[index].removeTask(taskIndex);
      updateTask(index);
    });
  });

  addTaskBtn.addEventListener("click", async () => {
    await getTask(index);
    updateTask(index);
  });
}

// Function to update projects in the sidebar
function updateProject() {
  projectList.innerHTML = "";

  projectArray.forEach((project, index) => {
    const list = document.createElement("div");
    const projectName = document.createElement("p");
    const deleteBtn = document.createElement("button");

    projectName.textContent = project.name;
    deleteBtn.textContent = "Delete";

    list.appendChild(projectName);
    list.appendChild(deleteBtn);
    list.className = "projectCard";
    projectList.appendChild(list);

    deleteBtn.addEventListener("click", () => {
      projectList.removeChild(list);
      if (index == activeProjectWindow) main.innerHTML = "";
      removeProject(index);
      if (activeProjectWindow === index) {
        updateTask(index - 1);
      }
      updateProject();
    });

    projectName.addEventListener("click", () => {
      activeProjectWindow = index;
      updateTask(index);
    });
  });
}

// Event listener to add a new project
addProjectBtn.addEventListener("click", () => {
  const projectName = prompt("Enter project name:");
  if (projectName) {
    addProject(projectName);
    updateProject();
  }
});
function intialize() {
  if (intializeProjectArray()) {
    updateProject();
    updateTask(0);
  }
}
intialize();
