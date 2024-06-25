import "./style.css";
import { createProject, deleteProject, projects } from "./models/projects.js";
import { saveProjects } from "./utils/storageUtils.js";
import createTodoItem, { editTodoItem, deleteTodoItem, findTodoItem, findProject, toggleCompleteTodoItem, logProjects } from "./utils/todoUtils.js";
import renderProjectTabs from "./dom/renderProjectTabs.js";
import renderInbox from "./dom/renderInbox.js";
import renderToday from "./dom/renderToday.js";
import renderThisWeek from "./dom/renderThisWeek.js"
import renderProjectsTodo from "./dom/renderProjectsTodo.js";
import { renderTodoForm, renderProjectForm, renderEditForm, renderConfirmDelete } from "./dom/modal.js";
import { renderTodoCount } from "./utils/domUtils.js";

// Current page id
let currentPageId = "today";

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

// Render all
function renderAll() {
    renderProjectTabs(); 
    renderPage(currentPageId);
    renderTodoCount();
}

// Initial Render
renderAll();

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
        renderPage(currentPageId);
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
    else if (target.closest(".delete-todo")) {
        const todoEl = target.closest(".todo-item");
        const todoId = todoEl.getAttribute("id");
        const projectId = todoEl.getAttribute("project-id")

        renderConfirmDelete(findTodoItem(todoId), findProject(projectId));
    }
    else if (target.closest(".delete-project")) {
        const pageTab = target.closest(".page-tab");
        const projectId = pageTab.id;

        target.closest(".delete-project").style.display = "none";
        pageTab.querySelector(".todo-count").style.display = "block";
        renderConfirmDelete(null, findProject(projectId));
    }
    else if (target.closest(".complete-btn")) {
        const todoEl = target.closest(".todo-item");
        const todoId = todoEl.getAttribute("id");

        toggleCompleteTodoItem(todoId);
        renderAll();
    }
});

const modalForm = document.querySelector(".modal-form");

// Forms submit handler
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
    else if (target.id === "confirm-delete-todo") {
        deleteTodoItem(todoId, modalForm.getAttribute("project-id"));
    }
    else if (target.id === "confirm-delete-project") {
        deleteProject(modalForm.getAttribute("project-id"));
        currentPageId = "inbox";
    }

    renderAll();
    saveProjects(projects);
    logProjects();

    event.target.reset();
});

// Mouseover handler 
document.addEventListener("mouseover", (event) => {
    const target = event.target;
    
    if (target.closest(".complete-btn")) {
        target.className = "";
        target.classList.add("fa-regular", "fa-circle-check")
    }
    else if (target.closest(".page-tab")) {
        const deleteBtn = target.querySelector(".delete-project");
        const todoCount = target.querySelector(".todo-count");
        
        if (deleteBtn) {
            deleteBtn.style.display = "block";
            todoCount.style.display = "none";
        }
    };
});

// Mouseout handler 
document.addEventListener("mouseout", (event) => {
    const target = event.target;
    const relatedTarget = event.relatedTarget;
    
    if (target.closest(".complete-btn")) {
        target.className = "";
        target.classList.add("fa-regular", "fa-circle")
    }
    else if (target.closest(".page-tab")) {
        const deleteBtn = target.querySelector(".delete-project");
        const todoCount = target.querySelector(".todo-count");
        
        if (deleteBtn && !target.contains(relatedTarget)) {
            deleteBtn.style.display = "none";
            todoCount.style.display = "block";
        }
    };
});