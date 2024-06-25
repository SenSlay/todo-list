import { projects } from "../models/projects";
import renderTodoItems from "../utils/domUtils";
import { isThisWeek } from "date-fns";

// Render every todo item
const renderThisWeek = () => {
    const contentTitle = document.querySelector(".content-title");
    contentTitle.textContent = "This Week";

    const thisWeekCtn = document.getElementById("todo-items-container");
    thisWeekCtn.innerHTML = "";

    // create add task btn and append
    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("content-add-task", "open-todo-modal");

    const addIcon = document.createElement("i");
    addIcon.classList.add("fa-solid", "fa-circle-plus");
    addTaskBtn.textContent = " Add Task ";
    addTaskBtn.prepend(addIcon);

    thisWeekCtn.append(addTaskBtn);

    // render todo items for this week starting on monday
    projects.forEach(project => {
        project.getTodoItems().forEach(todo => {
            // Check if todoItem's dueDate is this week
            if (isThisWeek(new Date(todo.getDueDate()), { weekStartsOn: 1 })) {
                renderTodoItems(thisWeekCtn, todo, project.getId());
            }
        })
    });
}

export default renderThisWeek;