import { projects } from "../projects";

// Render project tabs
const renderProjectTabs = () => {
    const projectTabsCtn = document.querySelector(".projects-container");

    // Clear HTML content
    projectTabsCtn.innerHTML = "";
    
    // Loop every project except for Inbox
    projects.filter(p => p.getId() !== projects[0].getId()).forEach((project) => {
        const pageTab = document.createElement("div");
        pageTab.classList.add("sidebar-item", "page-tab");
        pageTab.id = project.getId();
        pageTab.textContent = project.getName();

        const icon = document.createElement("i");
        icon.textContent = "#";
        pageTab.prepend(icon);

        const todoCount = document.createElement("span");
        todoCount.classList.add("todo-count");

        // If item count is 0, leave textContent empty
        todoCount.textContent = project.getTodoItems().length == 0 ? "" : project.getTodoItems().length;
        pageTab.append(todoCount);

        projectTabsCtn.append(pageTab);
    });
}

export default renderProjectTabs;