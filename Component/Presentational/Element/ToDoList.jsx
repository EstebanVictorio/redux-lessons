import React from 'react';
import ToDoStatus from 'Enum/ToDoStatus';

const getVisibility = (completed, filter) => {
    console.log(completed);
    console.log(filter);
    if (filter === ToDoStatus.ALL) {
        return 'visible';
    } else if (completed) {
        return filter === ToDoStatus.COMPLETED ? 'visible' : 'hidden';
    }
    return filter === ToDoStatus.ACTIVE ? 'visible' : 'hidden';
};

const ToDoList = ({todos, visibilityFilter, changeVisibility = null, addToDo = null, toggleToDo = null}) =>
    <div>
        <h2>To Do:</h2>
        <ul>
            {
                todos.map(t =>
                    <li key={t.id}
                        style={{
                            textDecoration: t.completed ? 'line-through' : 'none',
                            cursor: 'pointer',
                            userSelect: 'none',
                            color: t.completed ? 'gray' : 'black',
                            visibility: getVisibility(t.completed, visibilityFilter)
                        }}
                        onClick={() => toggleToDo(t.id)}>{t.text}</li>)
            }
        </ul>
        <button onClick={addToDo}>Add ToDo</button>
        <button onClick={() => changeVisibility(ToDoStatus.ALL)}>Show All</button>
        <button onClick={() => changeVisibility(ToDoStatus.ACTIVE)}>Show Active</button>
        <button onClick={() => changeVisibility(ToDoStatus.COMPLETED)}>Show Completed</button>
    </div>;

export default ToDoList;