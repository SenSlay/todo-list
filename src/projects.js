import { v4 } from "uuid";

// Array of projects
const projects = [];

// Project factory function
function Project(projectName) {
    const id = v4();
    let _name = projectName;
    const todoItems = [];

    const getId = () => id;

    const getName = () => _name;
    const getTodoItems = () => todoItems;
    
    // Add todo item
    const addTodoItem = (todoItem) => {
        todoItems.push(todoItem);
    }

    // Delete todo item
    const deleteTodoItem = (todoItemId) => {
        // Find index of todo item
        const index = todoItems.findIndex(item => item.getId() === todoItemId);

        // If item found, delete
        if (index !== -1) {
            todoItems.splice(index, 1);
        }
    }
    
    return {
        getId,
        getName,
        getTodoItems,
        addTodoItem,
        deleteTodoItem
    }
}

// Create project object and push to projects array
function createProject(projectName) {
    const newProject = Project(projectName)
    projects.push(newProject);
    
    return newProject;
}

// Delete project 
function deleteProject(projectName, projectId) {
    // Find project's index
    const index = projects.findIndex(p => p.getId() === projectId);

    projects.splice(index, 1);
}

// Push default project- Inbox and Home
createProject("Inbox");
createProject("Home");
createProject("Work");

export {createProject, projects, deleteProject};