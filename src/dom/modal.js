import { projects } from "../projects";
import { createElement } from "./utils";

// Render add todo form 
function renderTodoForm(currentPageId) {
    console.log(currentPageId);

    const formCtn = document.querySelector(".modal-form");
    formCtn.innerHTML = "";
    
    // Title textarea element
    const titleTextarea = createElement("textarea" , {
        name: 'title',
        id: 'title',
        rows: '1',
        cols: "40",
        placeholder: 'Task title',
        class: 'title-input',
        autofocus: '',
        required: ''
        });
     
    // Description textarea element
    const descriptionTextarea = createElement('textarea', {
        name: 'description',
        id: 'description',
        rows: '2',
        placeholder: 'Description',
        class: 'description-input'
    });

    // Create Due Date Label and Input
    const dueDateInput = createElement('input', {
        id: 'due-date',
        name: 'due-date',
        type: 'date',
        required: ''
    });

    const dueDateLabel = createElement('label', {
        for: 'due-date',
        textContent: 'Due date:',
        children: [dueDateInput]
    });

    // Create Priority Label and Select
    const priorityOptions = [
        { value: '', disabled: '', selected: '', textContent: 'Priority' },
        { value: 'High', textContent: 'High' },
        { value: 'Medium', textContent: 'Medium' },
        { value: 'Low', textContent: 'Low' }
    ].map(attrs => createElement('option', attrs));

    const prioritySelect = createElement('select', {
        name: 'priority',
        id: 'priority-select',
        required: '',
        children: priorityOptions
    });

    const priorityLabel = createElement('label', {
        for: 'priority-select',
        textContent: 'Priority:',
        children: [prioritySelect]
    });

    const formHeader = createElement("div", {
        class: "form-header",
        children: [titleTextarea, descriptionTextarea, dueDateLabel, priorityLabel]
    });


    // Create Projects Select
    const projectsOptions = [
        { value: 'Inbox', id: projects[0].getId() ,textContent: 'Inbox' },
        { label: 'Projects', children: projects.filter(p => p.getId() !== projects[0].getId()).map(project => {
            const el = createElement('option', { value: project.getName(), textContent: project.getName(), id: project.getId() });

            // If this project is the current page, add selected attribute
            if (project.getId() === currentPageId) {
                el.setAttribute("selected", "");
            }

            return el;
        })}
    ].map(attrs => {
        if (attrs.label) {
            const optgroup = createElement('optgroup', attrs);
            return optgroup;
        }
        return createElement('option', attrs);
    });

    const projectsSelect = createElement('select', {
        name: 'project',
        id: 'projects-select',
        children: projectsOptions
    });
    
    // Create Form Footer Div
    const formFooter = createElement('div', {
        class: 'form-footer',
        children: [projectsSelect]
    });
    
    // Create Modal Buttons Div
    const cancelBtn = createElement('button', {
        type: 'button',
        class: 'cancel-btn',
        id: 'cancel-todo',
        textContent: 'Cancel'
    });

    const addBtn = createElement('button', {
        type: 'submit',
        class: 'add-btn',
        id: 'add-todo',
        textContent: 'Add To-do'
    });
    
    const modalBtnsDiv = createElement('div', {
        class: 'modal-btns',
        children: [cancelBtn, addBtn]
    });
    
    // Append modal buttons to form footer
    formFooter.appendChild(modalBtnsDiv);
    
    // Append all elements to the form
    formCtn.appendChild(formHeader);
    formCtn.appendChild(formFooter);
}

export { renderTodoForm };