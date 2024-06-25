import { projects } from "../models/projects";
import { createElement } from "../utils/domUtils";

// Get the modal
const modal = document.getElementById("myModal");

function initialRender(formCtn, id) {
    // Reset modal form HTML content
    formCtn.innerHTML = "";

    // Assign form id
    formCtn.id = id;

    // Make modal visible
    modal.style.display = "block";
}

// Render todo form 
function renderTodoForm(currentPageId, todoItem = null, projectId = null) {
    const formCtn = document.querySelector(".modal-form")

    initialRender(formCtn, "todo-form");
    
    // Title textarea element
    const titleInput = createElement("input" , {
        name: "title",
        id: "title",
        placeholder: "Task title",
        class: "title",
        required: ""
        });
     
    // Description textarea element
    const descriptionTextarea = createElement("textarea", {
        name: "description",
        id: "description",  
        rows: "2",
        cols: "40",
        placeholder: "Description",
        class: "description"
    });

    // Create Due Date Label and Input
    const dueDateInput = createElement("input", {
        id: "due-date",
        name: "due-date",
        type: "date",
        required: ""
    });

    const dueDateLabel = createElement("label", {
        for: "due-date",
        textContent: "Due date:",
        children: [dueDateInput]
    });

    // Create Priority Label and Select
    const priorityOptions = [
        { value: "", disabled: "", selected: "", textContent: "Priority" },
        { value: "High", textContent: "High" },
        { value: "Medium", textContent: "Medium" },
        { value: "Low", textContent: "Low" }
    ];
    
    // For renderEditFunction
    if (todoItem) {
        delete priorityOptions[0].selected;

        priorityOptions.forEach(option => {
            if (option.value === todoItem.getPriority()) {
                option.selected = "";        
            }
        })
    };
     
    const priorityOptionsEls = priorityOptions.map(attrs => createElement("option", attrs));

    const prioritySelect = createElement("select", {
        name: "priority",
        id: "priority-select",
        required: "",
        children: priorityOptionsEls
    });

    const priorityLabel = createElement("label", {
        for: "priority-select",
        textContent: "Priority:",
        children: [prioritySelect]
    });

    const formHeader = createElement("div", {
        class: "form-header",
        children: [titleInput, descriptionTextarea, dueDateLabel, priorityLabel]
    });


    // Create Projects Select
    const projectsOptions = [
        { value: "Inbox", id: projects[0].getId() ,textContent: "Inbox" },
        { label: "Projects", children: projects.filter(p => p.getId() !== projects[0].getId()).map(project => {
            const el = createElement("option", { value: project.getName(), textContent: project.getName(), id: project.getId() });

            // If this project is the current page, add selected attribute
            if (project.getId() === currentPageId) {
                el.setAttribute("selected", "");
            }

            return el;
        })}
    ]

    // For renderEditForm
    if (todoItem) {
        projectsOptions[1].children.forEach(projectEl => {
            // Remove selected attribute for all project els
            if (projectEl.hasAttribute("selected")) {
                projectEl.removeAttribute("selected");
            }

            // Set the todoItem"s current project as selected
            if (projectEl.getAttribute("id") === projectId) {
                projectEl.setAttribute("selected", "");
            }
        });
    }
    
    const projectsOptionsEls = projectsOptions.map(attrs => {
        if (attrs.label) {
            const optgroup = createElement("optgroup", attrs);
            return optgroup;
        }
        return createElement("option", attrs);
    });

    const projectsSelect = createElement("select", {
        name: "project",
        id: "projects-select",
        children: projectsOptionsEls
    });
    
    // Create Modal Buttons Div
    const cancelBtn = createElement("button", {
        type: "button",
        class: "cancel-btn",
        id: "cancel-todo",
        textContent: "Cancel"
    });

    const addBtn = createElement("button", {
        type: "submit",
        class: "add-btn",
        id: "add-todo",
        textContent: "Add To-do"
    });
    
    const modalBtnsDiv = createElement("div", {
        class: "modal-btns",
        children: [cancelBtn, addBtn]
    });

    // Create Form Footer Div
    const formFooter = createElement("div", {
        class: "form-footer",
        children: [projectsSelect, modalBtnsDiv]
    });

    // For renderEditForm
    if (todoItem) {
        titleInput.value = todoItem.getTitle();
        descriptionTextarea.value = todoItem.getDescription();
        dueDateInput.value = todoItem.getDueDate();
        addBtn.id = "edit-btn";
        addBtn.textContent = "Confirm edit";
        formCtn.id = "edit-form";
        formCtn.setAttribute("todo-id", todoItem.getId());
    } 
    
    // Append all elements to the form
    formCtn.appendChild(formHeader);
    formCtn.appendChild(formFooter);

    titleInput.focus();
}

// Render project form
function renderProjectForm() {
    const formCtn = document.querySelector(".modal-form")

    initialRender(formCtn, "project-form");

    const titleInput = createElement("input", {
        class: "title",
        id: "project-title",
        name: "project-title",
        required: "",
        placeholder: "New Project Name"
    });

    const formHeader = createElement("div", {
        class: "form-header",
        children: [titleInput]
    });

    // Create Modal Buttons Div
    const cancelBtn = createElement("button", {
        type: "button",
        class: "cancel-btn",
        id: "cancel-todo",
        textContent: "Cancel"
    });

    const addBtn = createElement("button", {
        type: "submit",
        class: "add-btn",
        id: "add-todo",
        textContent: "Add To-do"
    });
    
    const modalBtnsDiv = createElement("div", {
        class: "modal-btns",
        children: [cancelBtn, addBtn]
    });

    // Create Form Footer Div
    const formFooter = createElement("div", {
        class: "form-footer",
        children: [modalBtnsDiv]
    });

    formCtn.append(formHeader);
    formCtn.append(formFooter);

    titleInput.focus();
}

// Render edit form primarily using todo form elements
function renderEditForm(todoItem, projectId) { 
    renderTodoForm(null, todoItem, projectId);
}

// Render confirm delete
function renderConfirmDelete(todoItem = null, project) {
    const formCtn = document.querySelector(".modal-form")
    if (todoItem) {
        formCtn.setAttribute("todo-id", todoItem.getId());
    }
    formCtn.setAttribute("project-id", project.getId());

    initialRender(formCtn, todoItem !== null ? "confirm-delete-todo" : "confirm-delete-project");

    const span = createElement("span", {
        class: "item-span",
        textContent: todoItem !== null ? todoItem.getTitle() : project.getName()
    });

    // Question mark after the span content
    const q = document.createElement("span");
    q.textContent = todoItem !== null ? "?" : " and all its tasks?";

    const confirmP = createElement("p", {
        class: "confirm-msg",
        textContent: "Are you sure want to delete ",
        children: [span, q],
    });

    const formHeader = createElement("div", {
        class: "form-header",
        children: [confirmP]
    });

     // Create Modal Buttons Div
     const cancelBtn = createElement("button", {
        type: "button",
        class: "cancel-btn",
        id: "cancel-todo",
        textContent: "Cancel"
    });

    const addBtn = createElement("button", {
        type: "submit",
        class: "add-btn",
        id: "delete-todo",
        textContent: "Delete"
    });
    
    const modalBtnsDiv = createElement("div", {
        class: "modal-btns",
        children: [cancelBtn, addBtn]
    });

    // Create Form Footer Div
    const formFooter = createElement("div", {
        class: "form-footer",
        children: [modalBtnsDiv]
    });

    formCtn.append(formHeader);
    formCtn.append(formFooter);
}

export { renderTodoForm, renderProjectForm, renderEditForm, renderConfirmDelete };