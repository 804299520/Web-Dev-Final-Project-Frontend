import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Employees() {
    const [employees, setEmployees] = React.useState([]);

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



    // DeleteEmployee
    function deleteEmployee(index) {
        return () => {
            const url = "http://localhost:8080/employees/delete/" + employees[index].id;
            fetch(url, { method: "delete" })
            window.location.reload();
        };
    }

    return (
        <div className="App">
            <h1> Employees </h1>
            {employees.length === 0 ? (
                <p className='error-message'> There are no employees. Click the button below to add one. </p>
            ) : (
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DEPARTMENT</th>
                            <th>ACTIONS</th>
                        </tr>

                        {

                            employees.map((employee, index) =>
                                <tr key={index + 1}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName + " " + employee.lastName}
                                    </td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Link to={'/employees/view/' + employee.id}>
                                            <button className='view-btn'> View </button>
                                        </Link>
                                        <Link to={'/employees/edit/' + employee.id}>
                                            <button className='edit-btn'> Edit </button>
                                        </Link>
                                        <button className='delete-btn' onClick={deleteEmployee(index)}> X </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )}
            {/* Add new employee */}
            <div>
                <Link to='/employees/add'>
                    <button className='add-btn'> Add Employee </button>
                </Link>
            </div>
        </div>
    )
}

export default Employees;