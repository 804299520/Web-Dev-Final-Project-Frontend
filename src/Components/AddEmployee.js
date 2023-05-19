import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    async function addEmployee() {
        let url = "http://localhost:8080/employees/add";
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, department }),
        });
        return response.json();
    }

    const saveEmployee = (e) => {
        if (firstName.length === 0 || lastName.length === 0 || department.length === 0) {
            alert("Please fill all the fields");
        }
        else {
            e.preventDefault();
            addEmployee();
            navigate('/employees');
        }
    }

    return (
        <div className='App'>
            <h1>Add Employee</h1>
            <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <label className='form-label'> First Name: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter First Name'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'> Last Name: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Last Name'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'> Department: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Department'
                            name='department'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                        </input>
                    </div>

                    <button className='submit-form-btn' onClick={(e) => saveEmployee(e)}>Submit</button>
                    <button className='back-btn' onClick={() => navigate('/employees')}>Back</button>'
                </form>
            </div>
        </div>
    )
}

export default AddEmployee;