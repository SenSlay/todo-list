import "./style.css";
import renderInbox from "./inbox.js";
import createTodoItem, {deleteTodoItem, editTodoItem} from "./todoFunctions.js";

renderInbox();

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
