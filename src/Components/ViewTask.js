import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../App.css'

function ViewTask() {
    const [i, setId] = useState(0);
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [completion, setCompletion] = useState('');

    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect(() => {
        const url = "http://localhost:8080/tasks/view/" + id;
        fetch(url)
            .then(res => {
                res.json()
                    .then((data) => {
                        setId(data.id)
                        setUserName(data.userName);
                        setDescription(data.description);
                        setPriority(data.priority);
                        setCompletion(data.completion);
                    })
            })
    }, []);

    function deleteTask(index) {
        return () => {
            const url = "http://localhost:8080/tasks/delete/" + i;
            fetch(url, { method: "delete" })
            window.location.reload();
        };
    }

    return (
        <div className="App">
            <h1 className='single-employee-title'>Task: No.{i}</h1>
            <p className='single-employee-department'>Assigned to: {userName}</p>
            <p className='single-employee-department'>Description: {description}.</p>
            <p className='single-employee-department'>Priority Level: {priority}</p>
            <p className='single-employee-department'>Completion Status: {completion}</p>
            <Link to={'/tasks/edit/' + i}>
                <button className='edit-btn'> Edit </button>
            </Link>
            <button className='delete-btn' onClick={deleteTask(i)}> X </button>
            <Link to='/tasks'>
                <button className='back-btn'> Back </button>
            </Link>
        </div>
    )
}

export default ViewTask;