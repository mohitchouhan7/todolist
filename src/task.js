import { compareAsc } from "date-fns";

function Task(name, date, detail, priority) {
  this.name = name;
  if (date === "") this.date = new Date();
  else this.date = new Date(date);
  this.detail = detail;
  this.status = "incomplete";
  this.priority = priority;
}
Task.prototype.changeStatus = function () {
  if (this.status === "Incomplete") {
    this.status = "Complete";
  } else {
    this.status = "Incomplete";
  }
  updateStorage();
};

function Project(name) {
  this.name = name;
  this.taskArray = [];
}
Project.prototype.addTask = function (name, date, detail, priority) {
  this.taskArray.push(new Task(name, date, detail, priority));
  this.taskArray.sort((a, b) => {
    return compareAsc(a.date, b.date);
  });
  updateStorage();
};
Project.prototype.removeTask = function (index) {
  this.taskArray.splice(index, 1);
  updateStorage();
};
let projectArray = [];
function updateStorage() {
  localStorage.setItem("data", JSON.stringify(projectArray));
}
function addProject(name) {
  projectArray.push(new Project(name));
  updateStorage();
}
function removeProject(index) {
  projectArray.splice(index, 1);
  updateStorage();
}

function intializeProjectArray() {
  if (localStorage.getItem("data")) {
    const temp = JSON.parse(localStorage.getItem("data"));
    if (temp.length === 0) return false;
    temp.forEach((element) => {
      const tempProject = new Project(element.name);
      element.taskArray.forEach((item) => {
        const task = new Task(
          item.name,
          new Date(item.date),
          item.detail,
          item.priority
        );
        task.status = item.status;
        tempProject.taskArray.push(task);
      });
      projectArray.push(tempProject);
    });
    return true;
  }
  return false;
}
export { projectArray, addProject, removeProject, intializeProjectArray };
