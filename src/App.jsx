import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function getTasks() {
    return [
        {
            id: 1,
            text: 'Dentist',
            day: '5 aprilie, 12:30',
        },
        {
            id: 2,
            text: 'Sedinta',
            day: '6 aprilie, 9:30',
        },
    ];
}

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const data = getTasks();
        setTasks(data);
    }, []);
    //Note: cand ave un array de dependinte, useEffect se apeleaza la fiecare re-render
    // cand avem un array de dependinte gol se apeleaza doar o data
    // pentru a controla cand se apeleaza useEffect putem scrie variable in array-ul de dependinte

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>ToDo App</h1>
                <Button text="Add" />
            </header>
            <Tasks tasks={tasks} onDelete={deleteTask} />
        </div>
    );
}

function Button({ color, text }) {
    return (
        <button className="btn" style={{ backgroundColor: color }}>
            {text}
        </button>
    );
}

function Tasks({ tasks, onDelete }) {
    return (
        <>
            {tasks.map((task, index) => (
                <Task key={index} task={task} onDelete={onDelete} />
            ))}
        </>
    );
}

function Task({ task, onDelete }) {
    return (
        <div className="task">
            <h3>
                {task.text}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id) } />
            </h3>
            <p>{task.day}</p>
        </div>
    );
}

export default App;
