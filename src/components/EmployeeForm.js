import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';

//functional component which returns employee form details.
const EmployeeForm = props => {
    const [employee, setEmployee] = useState(props.currentEmployee);
    const [error, setError] = useState('');

    useEffect(
        () => {
            setEmployee(props.currentEmployee)
        },
        [props]
    )

    //onchnange method for employee form fields
    const handleInputChange = event => {
        const { name, value } = event.target
        setEmployee({ ...employee, [name]: value })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="column">
                    <form
                        onSubmit={event => {
                            event.preventDefault();
                            const noPattern = new RegExp(/^[0-9\b]+$/);
                            const emailPatter = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                            if (!employee.name || !employee.company_name || !employee.email_id || !employee.contact_no || !employee.designation) return
                            else if (employee.name.length < 5) {
                                setError('Name must be more than 3 characters!');
                                return
                            } else if (!noPattern.test(employee.contact_no) || employee.contact_no.length !== 10) {
                                setError('Please enter valid phone number!');
                                return
                            } else if (!emailPatter.test(employee.email_id)) {
                                setError('Please enter valid email address!');
                                return
                            }

                            if (props.editing) {
                                props.updateEmployee(employee.id, employee)

                            } else {
                                props.addEmployee(employee)
                            }
                            setError('');
                        }}
                    >
                        <input type="text" name="name" value={employee.name} onChange={handleInputChange} placeholder="Name" />
                        <label>Company Name</label>
                        <input type="text" name="company_name" value={employee.company_name} onChange={handleInputChange} />
                        <label>Email ID</label>
                        <input type="text" name="email_id" value={employee.email_id} onChange={handleInputChange} />
                        <label>Contact No.</label>
                        <input type="text" name="contact_no" value={employee.contact_no} onChange={handleInputChange} />
                        <label>Designation</label>
                        <select name="designation" value={employee.designation} onChange={handleInputChange} >
                            <option value={employee.designation}>{employee.designation}</option>
                            <option value="CEO">CEO</option>
                            <option value="CTO">CTO</option>
                            <option value="CFO">CFO</option>
                            <option value="Manager">Manager</option>
                            <option value="Engineer">Engineer</option>
                        </select>
                        {error.length ? <span className='error'>{error}</span> : null}
                        <br />
                        <button className="button submitbtn">Submit</button>
                        <button onClick={() => props.setEditing(false)} className="button deletebtn">
                            Cancel
            </button>
                    </form>
                </div>
                <div className="column1">
                    <Avatar name={employee.name} size="250" round="20px" />
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm
