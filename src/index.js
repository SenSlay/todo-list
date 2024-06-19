import "./style.css";
import { createProject } from "./projects.js";
import createTodoItem, { editTodoItem, deleteTodoItem, findTodoItem, logProjects } from "./todoFunctions.js";
import renderProjectTabs from "./dom/renderProjectTabs.js";
import renderInbox from "./dom/renderInbox.js";
import renderToday from "./dom/renderToday.js";
import renderThisWeek from "./dom/renderThisWeek.js"
import renderProjectsTodo from "./dom/renderProjectsTodo.js";
import { renderTodoForm, renderProjectForm, renderEditForm, renderConfirmDelete } from "./dom/modal.js";

// Current page id
let currentPageId = "inbox";

// Render chosen page
function renderPage(pageId) {
    if (pageId === "inbox") {
        renderInbox();
    }
    else if (pageId === "today") {
        renderToday();
    }
    else if (pageId === "this-week") {
        renderThisWeek();
    }
    else {
        renderProjectsTodo(pageId);
    }
}

// Initial render
renderProjectTabs(); 
renderPage(currentPageId);

// Get the modal
const modal = document.getElementById("myModal");

// Tab-switching logic
function switchTab(target) {
    if (target.classList.contains("page-tab")) {
        // Remove all active class
        document.querySelectorAll(".page-tab").forEach(btn => {
            btn.classList.remove("active");
        });
        
        target.classList.add("active");

        currentPageId = target.id;

        // Render chosen page
        renderPage(target.id);
    }
}

// Clicks event handler
document.addEventListener("click", function(e) {
    const target = e.target;

    // Tab-switching logic
    switchTab(target);

    // Open todo modal
    if (target.classList.contains("open-todo-modal")) {
        renderTodoForm(currentPageId);
    }
    // Open project modal
    else if (target.id === "project-modal-btn") {
        renderProjectForm();
    }
    // Close modal
    else if (target == modal || target.classList.contains("close") || target.id === "cancel-todo") {
        modal.style.display = "none";
    }
    else if (target.closest(".edit-btn")) {
        const todoEl = target.closest(".todo-item");

        const todoId = todoEl.getAttribute("id");
        const projectId = todoEl.getAttribute("project-id")

        renderEditForm(findTodoItem(todoId), projectId);
    }
    else if (target.closest(".delete-btn")) {
        const todoEl = target.closest(".todo-item");
        const todoId = todoEl.getAttribute("id");
        const projectId = todoEl.getAttribute("project-id")

        renderConfirmDelete(findTodoItem(todoId), projectId);
    }
});

// Forms submit handler
const modalForm = document.querySelector(".modal-form");

modalForm.addEventListener('submit', function(event) {
    modal.style.display = "none";
    const target = event.target;
    event.preventDefault(); // Prevent the default form submission

    const todoId = modalForm.getAttribute("todo-id");
    const formData = new FormData(target);

    if (target.id === "project-form") {
        const newProject = formData.get("project-title");

        createProject(newProject);
    }
    else if (target.id === "todo-form" || target.id === "edit-form") {
        const title = formData.get("title");
        const description = formData.get("description");
        const dueDate = formData.get("due-date");
        const priority = formData.get("priority");
    
        // Get the id attribute of the selected project option
        const projectSelect = document.getElementById("projects-select");
        const selectedOption = projectSelect.options[projectSelect.selectedIndex];
        const selectedProjectId = selectedOption.id; 
    
        if (target.id === "todo-form") {
            console.log("test");
            createTodoItem(title, description, dueDate, priority, selectedProjectId);
        }
        else {
            editTodoItem(todoId, title, description, dueDate, priority, selectedProjectId);
        }
    }
    else if (target.id === "confirm-delete") {
        deleteTodoItem(todoId, modalForm.getAttribute("project-id"));
    }

    renderPage(currentPageId);
    renderProjectTabs();
    logProjects();

    event.target.reset();
});