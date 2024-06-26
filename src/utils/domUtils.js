import { format, compareAsc, isToday, isThisWeek } from "date-fns";
import { projects } from "../models/projects";

// Get the color for bg 
function getPriorityColor(priority) {
    if (priority === "High") return "Red";

    else if (priority === "Medium") return "Orange";

    else return "Green";
}

const renderTodoItems = (ctn, todo, projectId) => {
    if (todo.getIsComplete()) {
        return;
    }

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.id = todo.getId();
    todoItem.setAttribute("project-id", projectId);
    
    // create todo priority bar
    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-priority");
    todoPriority.style.backgroundColor = getPriorityColor(todo.getPriority());
    todoItem.prepend(todoPriority);

    // create todo circle and prepend
    const circleIcon = document.createElement("i");
    circleIcon.classList.add("fa-regular", "fa-circle");
    
    // complete button
    const completeBtn = document.createElement("btn");
    completeBtn.classList.add("complete-btn");
    completeBtn.append(circleIcon);
    todoItem.append(completeBtn);
    
    // create start
    const startBody = document.createElement("div");
    startBody.classList.add("todo-item-start-body");

    // create title and append element to start Body
    const title = document.createElement("p");
    title.classList.add("todo-title");
    title.textContent = todo.getTitle();
    startBody.append(title);

    // create description and append to start body
    const description = document.createElement("p");
    description.classList.add("todo-description");
    description.textContent = todo.getDescription();
    startBody.append(description);

    // append start body to todo item
    todoItem.append(startBody);

    // create end body
    const endBody = document.createElement("div");
    endBody.classList.add("todo-item-end-body");

    // create date and append to end body
    const date = document.createElement("p");
    date.classList.add("todo-date");
    date.textContent = format(todo.getDueDate(), "MMM dd");

    // Check if date is past due
    if (compareAsc(todo.getDueDate(), format(new Date(), "yyyy-MM-dd")) === -1) date.style.color = "Red";
    
    endBody.append(date);

    // create edit icon and append
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");
    
    // create edit btn
    const editBtn = document.createElement("button");
    editBtn.classList.add("todo-btn", "edit-btn");
    endBody.append(editBtn);
    editBtn.append(editIcon);
    
    // create delete icon and append
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can");
    
    // create delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo-btn",  "delete-todo");
    deleteBtn.append(deleteIcon);

    endBody.append(deleteBtn);

    todoItem.append(endBody);
    ctn.prepend(todoItem);
}

// Create and return an element with attributes and nested children
function createElement(type, options = {}) {
    const element = document.createElement(type);

    // Set attributes and properties
    for (const [key, value] of Object.entries(options)) {
        if (key === 'innerText' || key === 'textContent') {
            element.textContent = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else if (key === 'children' && Array.isArray(value)) {
            // Append child elements if 'children' key is provided
            value.forEach(child => element.appendChild(child));
        } else {
            element.setAttribute(key, value);
        }
    }

    return element;
}

// Render todo count for inbox, today, and this week
function renderTodoCount() {
    const inboxCountCtns = document.querySelectorAll(".inbox-count");
    const todayCountCtns = document.querySelectorAll(".today-count");
    const weekCountCtns = document.querySelectorAll(".week-count");

    const inboxCount = projects[0].getTodoItems().filter(todo => todo.getIsComplete() !== true).length;
    let todayCount = 0;
    let weekCount = 0;

    // render todo items for today
    projects.forEach(project => {
        todayCount += project.getTodoItems().filter(todo => todo.getIsComplete() !== true && isToday(new Date(todo.getDueDate()))).length;
        weekCount += project.getTodoItems().filter(todo => todo.getIsComplete() !== true && isThisWeek(new Date(todo.getDueDate()))).length;
    });

    // Update the text content for each count container
    inboxCountCtns.forEach(ctn => {
        ctn.textContent = inboxCount === 0 ? "" : inboxCount;
    });

    todayCountCtns.forEach(ctn => {
        ctn.textContent = todayCount === 0 ? "" : todayCount;
    });

    weekCountCtns.forEach(ctn => {
        ctn.textContent = weekCount === 0 ? "" : weekCount;
    });
}

export { renderTodoItems as default, createElement, renderTodoCount};