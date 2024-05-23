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
    const newProject = Project(projectName)
    projects.push(newProject);
    
    return newProject;
}

// Push default projects- Today and Home
projects.push(Project("Today"), Project("Home"));

export { createProject as default, projects };