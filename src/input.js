import { projectArray } from "./task";
const dialog = document.querySelector("dialog");

function getTask(index) {
  return new Promise((resolve, reject) => {
    dialog.showModal();
    const name = document.getElementById("taskname");
    const detail = document.getElementById("details");
    const date = document.getElementById("date");
    const priority = document.getElementById("priority");
    const cancelBtn = document.getElementById("cancel");
    const submitBtn = document.getElementById("submit");

    const onSubmit = (event) => {
      event.preventDefault();
      projectArray[index].addTask(
        name.value,
        date.value,
        detail.value,
        priority.value
      );
      name.value = "";
      detail.value = "";
      date.value = "";
      priority.value = "";
      dialog.close();
      cleanup(); // Clean up event listeners
      resolve("submitted");
    };

    const onCancel = () => {
      dialog.close();
      cleanup(); // Clean up event listeners
      resolve();
    };

    const cleanup = () => {
      submitBtn.removeEventListener("click", onSubmit);
      cancelBtn.removeEventListener("click", onCancel);
    };

    submitBtn.addEventListener("click", onSubmit);
    cancelBtn.addEventListener("click", onCancel);
  });
}
export { getTask };
