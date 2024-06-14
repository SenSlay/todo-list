import { projects } from "../projects";
import renderTodoItems from "./utils";
import { isToday } from "date-fns";

// Render every todo item
const renderToday = () => {
    const contentTitle = document.querySelector(".content-title");
    contentTitle.textContent = "Today";

    const todayCtn = document.getElementById("todo-items-container");
    todayCtn.innerHTML = "";

    // create add task btn and append
    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("content-add-task", "open-todo-modal");

    const addIcon = document.createElement("i");
    addIcon.classList.add("fa-solid", "fa-circle-plus");
    addTaskBtn.textContent = " Add Task ";
    addTaskBtn.prepend(addIcon);

    todayCtn.append(addTaskBtn);

    // render todo items for today
    projects.forEach(project => {
        project.getTodoItems().forEach(todo => {
            // Check if todoItem's dueDate is today
            if (isToday(new Date(todo.getDueDate()))) {
                renderTodoItems(todayCtn, todo, project.getId());
            }
        })
    });
}

export default renderToday;