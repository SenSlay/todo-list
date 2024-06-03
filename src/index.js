import "./style.css";
import renderInbox from "./dom/renderInbox.js";
import renderToday from "./dom/renderToday.js";
import createTodoItem, {deleteTodoItem, editTodoItem} from "./todoFunctions.js";

renderInbox();

document.addEventListener("click", function(e) {
    const target = e.target;

    if (target.classList.contains("page-btn")) {

        if (target.id === "Inbox") {
            renderInbox();
        }
        else if (target.id === "Today") {
            renderToday();
        }
    }
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document.addEventListener("click", (e) => {
    // Open modal if btn has .add-todo
    if (e.target.classList.contains("open-todo-modal")) {
        modal.style.display = "block";
    }

    // Close modal if outside of the modal is clicked
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

document.querySelector('.modal-form').addEventListener('submit', function(event) {
    modal.style.display = "none";
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("due-date");
    const priority = formData.get("priority");
    const project = formData.get("project");

    createTodoItem(title, description, dueDate, priority, project);
    renderInbox();

    event.target.reset();
});