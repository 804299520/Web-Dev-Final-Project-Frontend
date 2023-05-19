import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Tasks() {

    const navigate = useNavigate();

    const [tasks, setTasks] = React.useState([]);

    const [employees, setEmployees] = React.useState([]);

    const [message, setMessage] = React.useState('');

    //getAllEmployees
    useEffect(() => {
        const url = "http://localhost:8080/employees"
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setEmployees(data);
                    })
            })
    }, []);

    //getAllTasks
    useEffect(() => {
        const url = "http://localhost:8080/tasks"
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setTasks(data);
                        if (data.length < 1)
                            setMessage("Currently there are no Tasks.")
                        else
                            setMessage('');
                    })
            })
    }, []);

    // DeleteTask
    function deleteTask(index) {
        return () => {
            const url = "http://localhost:8080/tasks/delete/" + tasks[index].id;
            fetch(url, { method: "delete" })
            window.location.reload();
        };
    }

    return (
        <div className="App">
            <h1> Tasks </h1>
            <h1>{message}</h1>
            <table className='task-table'>
                <tbody>
                    <tr>
                        <th>ASSIGNED TO</th>
                        <th>DESCRIPTION</th>
                        <th>PRIORITY</th>
                        <th>COMPLETED</th>
                        <th>ACTIONS</th>
                    </tr>

                    {
                        tasks.map((task, index) =>
                            <tr key={index + 1}>
                                <td>{task.userName}</td>
                                <td>{task.description}</td>
                                <td>{task.priority}</td>
                                <td>{task.completion}</td>
                                <td>
                                    <Link to={'/tasks/view/' + task.id}>
                                        <button className='view-btn'> View </button>
                                    </Link>
                                    <Link to={'/tasks/edit/' + task.id}>
                                        <button className='edit-btn'> Edit </button>
                                    </Link>
                                    <button className='delete-btn' onClick={deleteTask(index)}> X </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>

            {/* Add Task Button */}
            <div>
                <Link to='/tasks/add'>
                    <button className='add-btn'> Add Task </button>
                </Link>
            </div>
        </div>
    )
}

export default Tasks;