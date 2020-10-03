import React, { useState, Fragment} from 'react'
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/ViewEmployees';

const App = () => {
	// JSON Data for the employee managaement form
	const employeesData = [
		{ id: 1, name: 'Rohit Sharma', company_name: 'MI', email_id: 'abc@emp.net', contact_no: '9988776655', designation: 'CEO'},
		{ id: 2, name: 'MS Dhoni', company_name: 'CSK', email_id: 'mno@emp.net', contact_no: '9988776644', designation: 'CFO'},
		{ id: 3, name: 'Viral Kohli', company_name: 'RCB', email_id: 'pqr@emp.net', contact_no: '9988776633', designation: 'CTO'},
	]

	const initialFormState = { id: null, name: '', company_name: '', email_id: '', contact_no: '', designation: ''}
		

	// Setting state
	const [ employees, setEmployees ] = useState(employeesData)
	const [ currentEmployee, setCurrentEmployee ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addEmployee = employee => {
		employee.id = employees.length + 1
    setEmployees([ ...employees, employee ])
    setCurrentEmployee(initialFormState);
	}

	const deleteEmployee = id => {
		setEditing(false);
		setEmployees(employees.filter(employee => employee.id !== id))
	}

	const updateEmployee = (id, updatedEmployee) => {
		setEditing(false);
    setEmployees(employees.map(employee => (employee.id === id ? updatedEmployee : employee)));
    setCurrentEmployee(initialFormState);
	}

	const editRow = employee => {
		setEditing(true);
    setCurrentEmployee({ id: employee.id, name: employee.name, company_name: employee.company_name, email_id: employee.email_id, contact_no: employee.contact_no, designation: employee.designation})

  }
  //CORD Operation Method Ends here

  //Container UI Design 
	return (
		<Fragment>
        <h1>Employee Management</h1>
        <EmployeeForm
								editing={editing}
								setEditing={setEditing}
								currentEmployee={currentEmployee}
                updateEmployee={updateEmployee}
                addEmployee={addEmployee}
							/>
					<h2>View Employees</h2>
					<EmployeeTable employees={employees} editRow={editRow} deleteEmployee={deleteEmployee} />
			</Fragment>
	)
}

export default App
