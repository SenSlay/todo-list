import "./style.css";
import createTodoItem from "./todoFunctions.js";
import renderProjectTabs from "./dom/renderProjectTabs.js";
import renderInbox from "./dom/renderInbox.js";
import renderToday from "./dom/renderToday.js";
import renderThisWeek from "./dom/renderThisWeek.js"
import renderProjectsTodo from "./dom/renderProjectsTodo.js";
import { renderTodoForm } from "./dom/modal.js";

// Current page id
let currentPageId = "inbox";

// Initial render
renderProjectTabs(); 
renderPage(currentPageId);

// Get the modal
const modal = document.getElementById("myModal");

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

// Click event handlers
document.addEventListener("click", function(e) {
    const target = e.target;

    // Tab-switching logic
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

    // Open modal
    if (target.classList.contains("open-todo-modal")) {
        renderTodoForm(currentPageId);
        modal.style.display = "block";
    }

    // Close modal if outside of the modal is clicked
    if (target == modal || target.classList.contains("close")) {
        modal.style.display = "none";
    }

    if (target.id === "cancel-todo") {
        modal.style.display = "none";
        document.querySelector(".modal-form").reset();
    }
});

document.querySelector('.modal-form').addEventListener('submit', function(event) {
    modal.style.display = "none";
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("due-date");
    const priority = formData.get("priority");

    // Get the id attribute of the selected project option
    const projectSelect = document.getElementById("projects-select");
    const selectedOption = projectSelect.options[projectSelect.selectedIndex];
    const projectId = selectedOption.id; 

    createTodoItem(title, description, dueDate, priority, projectId);
    renderPage(currentPageId);

    event.target.reset();
});