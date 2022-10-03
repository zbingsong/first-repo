import React from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ListEmployeeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
    }

    addEmployee = () => {
        // By pushing into history, we do a redirect for the user
        // "history" object is also mutated in this case
        this.props.history.push('/add/-1')
    }

    updateEmployee = username => {
        this.props.history.push(`/add/${username}`)
    }

    deleteEmployee = username => {
        // Remove the employee and update state directly
        EmployeeService.deleteEmployee(username).then(response => {
            this.setState(prevState => ({
                employees: prevState.employees.filter(employee => employee.username !== username)
            }))
        })
    }

    viewEmployee = username => {
        this.props.history.push(`/view/${username}`)
    }

    deleteAll = () => {
        // Remove all employees and clear out the state
        EmployeeService.deleteAll().then(response => {
            this.setState({employees: []})
        })
    }

    componentDidMount() {
        EmployeeService.getEmployees()
            .then(response => this.setState({employees: response.data}))
    }

    render() {
        return (
            <div>

                <h1 className='text-center'>Employee List</h1>

                <div className='row'>
                    <button className='btn btn-primary' onClick={this.addEmployee}>
                        Add Employee
                    </button>

                    <button className='btn btn-danger' onClick={this.deleteAll}>
                        Clear All Records
                    </button>
                </div>

                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* return a table row for every employee */
                            this.state.employees.map(
                                employee => (
                                    <tr key={employee.username}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <button onClick={() => this.updateEmployee(id)} className="btn btn-info">Update</button>
                                            <button onClick={() => this.deleteEmployee(id)} className="btn btn-danger">Delete</button>
                                            <button onClick={() => this.viewEmployee(id)} className="btn btn-primary">View</button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }

}
