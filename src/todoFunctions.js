import todoItem from "./todoItem.js";
import createProject, { projects } from "./projects.js";

// Create Todo Item and push to respective project
function createTodoItem(title, description, dueDate, priority, projectName = "Today") {
    const todo = todoItem(title, description, dueDate, priority)

    // Find project by name
    let project = projects.find(p => p.getName() === projectName);

    // If project doesn't exist, create it
    if (!project) {
        project = createProject(projectName);
    }

    // Add the todo item to respective project
    project.addTodoItem(todo);
}

createTodoItem("Todo1", "Description", "Today", "High");
createTodoItem("Todo2", "Description", "Today", "High", "Home");
createTodoItem("Todo3", "Description", "Today", "High", "Work");

// Log all projects and their todo items
projects.forEach(project => {
    console.log(`Project: ${project.getName()}`);
    project.getTodoItems().forEach(todo => {
        console.log(`  Todo: [${todo.getId()}] ${todo.getTitle()}`);
    });
});

export default createTodoItem;