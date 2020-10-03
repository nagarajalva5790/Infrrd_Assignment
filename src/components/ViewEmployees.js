import React from 'react';
import Avatar from 'react-avatar';

//functional component which returns employee details in table format
const EmployeeTable = props => (
    <div className="container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Company Name</th>
                    <th>Email ID</th>
                    <th>Contact No.</th>
                    <th>Designation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.employees.length > 0 ? (
                    props.employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <th><Avatar name={employee.name} size="50" round={true} /></th>
                            <td>{employee.company_name}</td>
                            <td>{employee.email_id}</td>
                            <td>{employee.contact_no}</td>
                            <td>{employee.designation}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        props.editRow(employee)
                                    }}
                                    className="button submitbtn"
                                >
                                    Edit
              </button>
                                <button
                                    onClick={() => { if (window.confirm('Are you sure to delete this record?')) { props.deleteEmployee(employee.id) }; }}
                                    className="button deletebtn"
                                >
                                    Delete
              </button>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>No employees</td>
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
)

export default EmployeeTable
