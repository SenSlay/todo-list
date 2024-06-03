import { projects } from "../projects";
import renderTodoItems from "./renderTodoItems";
import { isThisWeek } from "date-fns";

// Render every todo item
const renderThisWeek = () => {
    const contentTitle = document.querySelector(".content-title");
    contentTitle.textContent = "This Week";

    const thisWeekCtn = document.getElementById("todo-items-container");
    thisWeekCtn.innerHTML = "";

    // create add task btn and append
    const addTaskBtn = document.createElement("div");
    addTaskBtn.classList.add("content-add-task", "open-todo-modal");

    const addIcon = document.createElement("i");
    addIcon.classList.add("fa-solid", "fa-circle-plus");
    addTaskBtn.textContent = " Add Task ";
    addTaskBtn.prepend(addIcon);

    thisWeekCtn.append(addTaskBtn);

    // render todo items for this week starting on monday
    projects.forEach(project => {
        project.getTodoItems().forEach(todo => {

            if (isThisWeek(new Date(todo.getDueDate()), { weekStartsOn: 1 })) {
                renderTodoItems(thisWeekCtn, todo);
            }
        })
    });
}

export default renderThisWeek;