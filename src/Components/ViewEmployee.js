import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router-dom';
import '../App.css';

function ViewEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = React.useState('');

    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect(() => {
        let url = "http://localhost:8080/employees/view/" + id;
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setFirstName(data.firstName);
                        setLastName(data.lastName);
                        setDepartment(data.department);
                    })
            })
    }, []);

    useEffect(() => {
        const url = "http://localhost:8080/tasks/" + id;
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setTasks(data);
                        if (data.length < 1)
                            setMessage("Currently there are no Task for this Employee.")
                        else
                            setMessage('');
                    })
            })
    }, []);

    function deleteTask(index) {
        return () => {
            const url = "http://localhost:8080/tasks/delete/" + tasks[index].id;
            fetch(url, { method: "delete" })
            window.location.reload();
        };
    }

    return (
        <div className="App">
            <h1> {firstName} {lastName}</h1>
            <p> Department: {department}</p>
            <h1>{message}</h1>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>DESCRIPTION</th>
                            <th>PRIORITY</th>
                            <th>COMPLETED</th>
                            <th>ACTIONS</th>
                        </tr>
                        {
                            tasks.map((task, index) =>
                                <tr key={index + 1}>
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
                <button className='back-btn' onClick={() => navigate('/employees')}> Back </button>
            </div>
        </div>
    )
}
export default ViewEmployee;