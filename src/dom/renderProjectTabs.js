import { projects } from "../projects";

// Render project tabs
const renderProjectTabs = () => {
    const projectTabsCtn = document.querySelector(".projects-container");

    // Clear HTML content
    projectTabsCtn.innerHTML = "";
    
    // Loop every project except for Inbox
    projects.filter(p => p.getId() !== projects[0].getId()).forEach((project) => {
        const icon = document.createElement("i");
        icon.textContent = "#";

        const projectName = document.createElement("p");
        projectName.classList.add("tab-name");
        projectName.textContent = project.getName();

        const todoCount = document.createElement("span");
        todoCount.classList.add("todo-count");
        
        // The project length without items that are complete
        const projectLength = project.getTodoItems().filter(todo => todo.getIsComplete() !== true).length;
        
        // If project length 0, leave textContent empty
        todoCount.textContent = projectLength == 0 ? "" : projectLength;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-regular", "fa-trash-can")

        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete-project");
        deleteBtn.append(deleteIcon);

        const pageTab = document.createElement("div");
        pageTab.classList.add("sidebar-item", "page-tab");
        pageTab.id = project.getId();

        pageTab.prepend(icon);
        pageTab.append(projectName);
        pageTab.append(deleteBtn);
        pageTab.append(todoCount);

        projectTabsCtn.append(pageTab);
    });
}

export default renderProjectTabs;