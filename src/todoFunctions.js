import todoItem from "./todoItem.js";
import createProject, { projects } from "./projects.js";

// Create todo item and push to respective project
function createTodoItem(title, description, dueDate, priority, projectName = "Inbox") {
    const todo = todoItem(title, description, dueDate, priority);

    // Find project by name
    let project = projects.find(p => p.getName() === projectName);

    // Add the todo item to respective project
    project.addTodoItem(todo);
}

// Delete todo Item
function deleteTodoItem(todoItemId, projectName) {
    // Find the project of the todo item
    const project = projects.find(p => p.getName() === projectName);

    // If project exists, delete item
    if (project) {
        project.deleteTodoItem(todoItemId);
    }
}

// Edit Todo Item
function editTodoItem(todoItemId, newTitle, newDescription, newDueDate, newPriority, oldProjectName, newProjectName) {
    // Find the old project
    const oldProject = projects.find(p => p.getName() === oldProjectName);
    
    // Check if project exists 
    if (!oldProject) {
        throw new Error(`Project "${oldProjectName}" not found.`);
    }

    // Find the todo item within the old project
    const todoItem = oldProject.getTodoItems().find(item => item.getId() === todoItemId);

    // Check if todo item exists in the old project
    if (!todoItem) {
        throw new Error(`Todo item with ID "${todoItemId}" not found in project "${oldProjectName}".`);
    }

    // Update todo item's properties
    todoItem.setTitle(newTitle);
    todoItem.setDescription(newDescription);
    todoItem.setDueDate(newDueDate);
    todoItem.setPriority(newPriority);

    // If the project is changed, remove the todo item from the old project and add it to the new project
    if (newProjectName !== oldProjectName) {
        // Find the new project
        const newProjectObj = projects.find(p => p.getName() === newProjectName);

        // Check if new project exists
        if (!newProjectObj) {
            throw new Error(`Project "${newProjectName}" not found.`);
        }

        // Remove the todo item from the old project
        oldProject.deleteTodoItem(todoItemId);

        // Add the todo item to the new project
        newProjectObj.addTodoItem(todoItem);
    }
}

// Toggle complete todo item
function toggleCompleteTodoItem(todoItemId, projectName) {
    // Find todo item
    const todo = projects.find(p => p.getName() === projectName).getTodoItems().find(t => t.getId() === todoItemId);

    todo.toggleComplete();
}

function logProjects() {
    projects.forEach((project, projectIndex) => {
        console.log(`Project ${projectIndex + 1}: ${project.getName()}`);
        const todoItems = project.getTodoItems();
        if (todoItems.length === 0) {
            console.log('  No todo items.');
        } else {
            todoItems.forEach((todo, todoIndex) => {
                console.log(`  Todo ${todoIndex + 1}:`);
                console.log(`    Title: ${todo.getTitle()}`);
                console.log(`    Description: ${todo.getDescription()}`);
                console.log(`    Due Date: ${todo.getDueDate()}`);
                console.log(`    Priority: ${todo.getPriority()}`);
            });
        }
    });
}

createTodoItem("Sample Todo", "lala la la  la", "test", "test");
createTodoItem("Sample Todo", "lala la la  la", "test", "High");

logProjects();

export {createTodoItem as default, deleteTodoItem, editTodoItem, toggleCompleteTodoItem};