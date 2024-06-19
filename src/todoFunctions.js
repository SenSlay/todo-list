import todoItem from "./todoItem.js";
import { projects } from "./projects.js";

// Find project using projectId
function findProject(projectId) {
    return projects.find(p => p.getId() === projectId);
}

// Find todoItem
function findTodoItem(todoItemId) {
    for (const project of projects) {
        const todo = project.getTodoItems().find(todo => todo.getId() === todoItemId);

        if (todo) {
            return todo;
        }
    }
}

// Create todo item and push to respective project
function createTodoItem(title, description, dueDate, priority, projectId) {
    const todo = todoItem(title, description, dueDate, priority);

    // Find project
    let project = findProject(projectId);

    // Add the todo item to respective project
    project.addTodoItem(todo);
}

// Delete todo Item
function deleteTodoItem(todoItemId, projectId) {
    // Find the project of the todo item
    const project = findProject(projectId);

    // If project exists, delete item
    if (project) {
        project.deleteTodoItem(todoItemId);
    }
 }

// Edit Todo Item
function editTodoItem(todoItemId, newTitle, newDescription, newDueDate, newPriority, newProjectId) {
    // Find the todo item
    const todoItem = findTodoItem(todoItemId);

    // Check if todo item exists in the old project
    if (!todoItem) {
        throw new Error(`Todo item is not found in the project.`);
    }

    // Find the og project the todoItem is in
    const oldProject = () => {
        for (const project of projects) {
            const todo = project.getTodoItems().find(todo => todo == todoItem);

            if (todo) {
                return project;
            }
        }
    };

    // Update todo item's properties
    todoItem.setTitle(newTitle);
    todoItem.setDescription(newDescription);
    todoItem.setDueDate(newDueDate);
    todoItem.setPriority(newPriority);

    // If the project is changed, remove the todo item from the old project and add it to the new project
    if (newProjectId !== oldProject().getId()) {
        // Find the new project
        const newProjectObj = findProject(newProjectId);

        // Check if new project exists
        if (!newProjectObj) {
            throw new Error(`Project not found.`);
        }

        // Remove the todo item from the old project
        oldProject().deleteTodoItem(todoItemId);

        // Add the todo item to the new project
        newProjectObj.addTodoItem(todoItem);
    }
}

// Toggle complete todo item
function toggleCompleteTodoItem(todoItemId) {
    // Find todo item
    const todo = findTodoItem(todoItemId);

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

createTodoItem("Sample Todo 1", "lala la la  la", "2024-06-02", "Low", projects[0].getId());
createTodoItem("Sample Todo 2", "lala la la  la", "2023-06-02", "High", projects[1].getId());
createTodoItem("Sample Todo 3", "lala la la  la", "2024-06-03", "Medium", projects[1].getId());
createTodoItem("Sample Todo 4", "lala la la  la", "2024-06-06", "Medium", projects[0].getId());
createTodoItem("Sample Todo 5", "lala la la  la", "2024-06-05", "Medium", projects[2].getId());

logProjects();

export {createTodoItem as default, deleteTodoItem, editTodoItem, toggleCompleteTodoItem, findTodoItem, findProject, logProjects};