import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Routes, Route } from 'react-router-dom';

const StoreContext = createContext(null);
// null este valoarea initiala

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
        <Routes>
            <Route
                index
                element={
                    <StoreContext.Provider
                        value={{ tasks, addTask, deleteTask }}
                    >
                        {/* pentru a "baga" in context info de care avem nevoie trebuie sa le pasam la proprietatea de value */}
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
                            {tasks.length > 0 ? <Tasks /> : 'No tasks to show'}
                        </div>
                    </StoreContext.Provider>
                }
            />
            <Route path="about" element={<h2>About</h2>} />
        </Routes>
    );
}

function AddTask() {
    // const [text, setText] = useState('');
    // const [day, setDay] = useState('');

    const text = useRef('');
    const day = useRef('');
    const { addTask } = useContext(StoreContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!text || !day) {
            alert('Please add task text and day');
            return;
        }

        addTask({ text: text.current.value, day: day.current.value });

        text.current.value = '';
        day.current.value = '';

        // setText('');
        // setDay('');
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="task-name">Task</label>
                <input
                    type="text"
                    name="task-name"
                    placeholder="Add Task"
                    ref={text}
                />
            </div>
            <div className="form-control">
                <label htmlFor="date">Day&Time</label>
                <input
                    type="text"
                    name="date"
                    placeholder="Add Date"
                    ref={day}
                />
            </div>
            <div className="form-control">
                <input
                    type="submit"
                    value="Save Task"
                    className="btn btn-block"
                />
            </div>
        </form>
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

function Tasks() {
    const { tasks, deleteTask } = useContext(StoreContext);
    return (
        <>
            {tasks.map((task, index) => (
                <Task key={index} task={task} onDelete={deleteTask} />
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
