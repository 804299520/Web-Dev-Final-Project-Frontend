import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import '../App.css';

function EditTask() {
    const [user, setUser] = useState(0)
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [completion, setCompletion] = useState('');
    const navigate = useNavigate();

    const [employees, setEmployees] = React.useState([]);

    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    //getAllEmployees
    useEffect(() => {
        const url = "http://localhost:8080/employees";
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setEmployees(data);
                    })
            })
    }, []);

    useEffect(() => {
        const url = "http://localhost:8080/tasks/view/" + id;
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setUser(data.user);
                        setDescription(data.description)
                        setPriority(data.priority)
                        setCompletion(data.completion)
                    })
            })
    }, []);

    async function editTask() {
        let url = "http://localhost:8080/tasks/edit/" + id;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, description, priority, completion }),
        });
        return response.json();
    }

    const saveTask = (e) => {
        e.preventDefault();
        editTask();
        navigate('/tasks');
    }

    return (
        <div className='App'>
            <h1>Edit Task</h1>
            <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <label className='form-label'> User </label>
                        <select
                            className='option-control'
                            name='user'
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        >
                            <option value={0}>Unassigned</option>
                            {
                                employees.map((employee, index) =>
                                    <option key={index} value={employees[index].id}>{employee.firstName + " " + employee.lastName}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='form-label'> Description: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Description'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className='form-group'>
                        <label className='form-label'> Priority: </label>
                        <select
                            className='option-control'
                            name='priority'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='form-label'> Completion Status: </label>
                        <select
                            className='option-control'
                            name='completion'
                            value={completion}
                            onChange={(e) => setCompletion(e.target.value)}
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="Inprogress">Inprogress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button className='submit-form-btn' onClick={(e) => saveTask(e)}>Submit</button>
                    <button className='back-btn' onClick={() => navigate('/tasks')}>Back</button>'
                </form>
            </div>
        </div>
    )

}

export default EditTask;