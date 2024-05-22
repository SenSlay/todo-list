export default function todoItem(title, description, dueDate, priority, isComplete) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _isComplete = isComplete;

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