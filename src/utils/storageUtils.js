import { Project } from "../models/projects";
import TodoItem from "../models/todoItem";

// Serialization for project
function serializeProject(project) {
    return JSON.stringify({
        id: project.getId(),
        name: project.getName(),
        todoItems: project.getTodoItems().map(item => ({
            id: item.getId(),
            title: item.getTitle(),
            description: item.getDescription(),
            dueDate: item.getDueDate(),
            priority: item.getPriority(),
            isComplete: item.getIsComplete()
        }))
    });
}

// Deserialization function for Project
function deserializeProject(serializedProject) {
    const data = JSON.parse(serializedProject);
    const project = Project(data.name);

    // Directly setting the ID is not recommended, but for the sake of this example:
    project.getId = () => data.id;  // Overriding the getId function to return the original ID

    // Reconstruct the todo items
    data.todoItems.forEach(itemData => {
        const todoItem = TodoItem(itemData.title, itemData.description, itemData.dueDate, itemData.priority);
        project.addTodoItem(todoItem);
    });

    return project;
}

// Save projects to local storage
function saveProjects(projects) {
    const serializedProjects = projects.map(project => serializeProject(project));

    console.log(serializedProjects);

    localStorage.setItem("projects", JSON.stringify(serializedProjects));
};

// Load projects from local storage
function loadProjects() {
    const serializedProjects = localStorage.getItem("projects");
    
    if (serializedProjects) {
        const parsedProjects = JSON.parse(serializedProjects);
        const deserializedProjects = parsedProjects.map(project => deserializeProject(project));
        return deserializedProjects;
    }
    return [];
};

export {saveProjects, loadProjects}