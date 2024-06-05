import { v4 } from "uuid";

// Todo item factory function
export default function TodoItem(title, description, dueDate, priority, isComplete = false) {
    // Check if title is filled
    if (!title) {
        throw new Error("Title is required");
    }

    const _id = v4();
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _isComplete = isComplete;

    // Setter and getter method for each property
    const getId = () => _id;

    const getTitle = () => _title;
    const setTitle = (newTitle) => { _title = newTitle; };
    
    const getDescription = () => _description;
    const setDescription = (newDescription) => { _description = newDescription; };

    const getDueDate = () => _dueDate;
    const setDueDate = (newDueDate) => { _dueDate = newDueDate; };

    const getPriority = () => _priority;
    const setPriority = (newPriority) => { _priority = newPriority; };

    const getIsComplete = () => _isComplete;
    const toggleComplete = () => { _isComplete = !_isComplete; };

    return {
        getId,

        getTitle,
        setTitle,

        getDescription,
        setDescription,

        getDueDate,
        setDueDate,

        getPriority,
        setPriority,

        getIsComplete,
        toggleComplete
    };
}