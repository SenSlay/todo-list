import { projects } from "../projects";
import renderTodoItems from "./renderTodoItems";

// Render every todo item
const renderProjectsTodo = (projectId) => {
    // Find index of project
    const projectIndex = projects.findIndex(p => p.getId() === projectId);

    const project = projects[projectIndex];

    const contentTitle = document.querySelector(".content-title");
    contentTitle.textContent = project.getName();

    const projectCtn = document.getElementById("todo-items-container");
    projectCtn.innerHTML = "";

    // create add task btn and append
    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("content-add-task", "open-todo-modal");

    const addIcon = document.createElement("i");
    addIcon.classList.add("fa-solid", "fa-circle-plus");
    addTaskBtn.textContent = " Add Task ";
    addTaskBtn.prepend(addIcon);

    projectCtn.append(addTaskBtn);


    // render respective todo items of chosen project
    project.getTodoItems().forEach(todo => {
        renderTodoItems(projectCtn, todo);
    });
}

export default renderProjectsTodo;