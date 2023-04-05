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
    const [showAddTask, setShowAddTask] = useState(false);

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

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>To Do App</h1>
                <Button
                    color={showAddTask ? 'red' : 'green'}
                    text={showAddTask ? 'Close' : 'Add'}
                    onClick={() => setShowAddTask(!showAddTask)}
                />
            </header>
            {showAddTask && <AddTask />}
            {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} />
            ) : (
                'No tasks to show'
            )}
        </div>
    );
}

function AddTask({ onAdd }) {
    const [name, setName] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !time) {
            alert('Please add task name and time');
            return;
        }

        onAdd({ name, time });

        setName('');
        setTime('');
    };

    return (
        <from className="add-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="task-name">Task</label>
                <input
                    type="text"
                    name="task-name"
                    placeholder="Add Task"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="form-control">
                <label htmlFor="date">Day&Time</label>
                <input
                    type="text"
                    name="date"
                    placeholder="Add Time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                />
            </div>
            <div className="form-control">
                <input
                    type="submit"
                    value="Save Task"
                    className="btn btn-block"
                />
            </div>
        </from>
    );
}

function Button({ color, text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="btn"
            style={{ backgroundColor: color }}
        >
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
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    );
}

export default App;
