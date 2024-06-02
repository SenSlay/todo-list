import {projects} from "./projects";
import renderTodoItems from "./renderTodoItems";

// Render every todo item
const inbox = () => {
    const contentTitle = document.querySelector(".content-title");
    contentTitle.textContent = "Inbox";

    const inboxCtn = document.getElementById("todo-items-container");

    projects.forEach(project => {
        project.getTodoItems().forEach(todo => {
            renderTodoItems(inboxCtn, todo);
        })
    });
}

export default inbox;