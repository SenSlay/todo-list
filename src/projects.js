// Array of projects
const projects = [];

// Project factory function
function Project(projectName) {
    let _name = projectName;
    const todoItems = [];

    const getName = () => _name;
    const getTodoItems = () => todoItems;

    const addTodoItem = (todoItem) => {
        todoItems.push(todoItem);
    }

    return {
        getName,
        getTodoItems,
        addTodoItem
    }
}

// Create project object and push to projects array
function createProject(projectName) {
    projects.push(Project(projectName));
}

export { createProject as default, projects };