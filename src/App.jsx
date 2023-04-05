import { useEffect, useState } from 'react';

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
    useEffect(() => {
        console.log('test');
    }, []);

    return (
        <div className="container">
            <header className="header">
                <h1>ToDo App</h1>
                <Button color="red" text="Add" />
            </header>
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

export default App;
