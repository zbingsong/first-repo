import React from 'react'
import EmployeeService from '../services/EmployeeService'

export default class CreateEmployeeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // username == -1: add new employee; otherwise, update existing employee
            username: this.props.match.params.username,
            firstName: '',
            lastName: '',
            emailId: '',
            privilegeLevel: ''
        }
    }

    changeFirstName = event => {
        this.setState({firstName: event.target.value})
    }

    changeLastName = event => {
        this.setState({lastName: event.target.value})
    }

    changeEmailId = event => {
        this.setState({emailId: event.target.value})
    }

    changePrivilegeLevel = event => {
        this.setState({privilegeLevel: event.target.value})
    }

    componentDidMount() {
        if (this.state.username !== '-1') {
            EmployeeService.getEmployeeById(this.state.username)
            .then(response => {
                const employee = response.data
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId,
                    privilegeLevel: employee.privilegeLevel
                })
            })
        }
    }

    saveEmployee = event => {
        event.preventDefault()
        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            privilegeLevel: this.state.privilegeLevel
        }

        if (this.state.username === '-1') {
            EmployeeService.addEmployee(employee)
            .then(response => {
                // Handle browsing history
                // By pushing into history, we do a redirect for the user
                this.props.history.push('')
            })
        } else {
            EmployeeService.updateEmployee(employee, this.state.username)
                .then(response => {
                    /* Handle browsing history
                     * By pushing into history, we do a redirect for the user
                     * Router automatically injects a "history" object into the props
                     */
                    this.props.history.push('')
                })
        }
    }

    cancelSubmit = () => {
        // Go back to index without saving
        this.props.history.push('')
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>

                        <h3 className='text-center'>
                            {(this.state.username == -1) ? "Add" : "Update"} Employee
                        </h3>

                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>First Name: </label>
                                    <input 
                                        name='firstName' 
                                        className='form-control' 
                                        placeholder='First Name' 
                                        value={this.state.firstName} 
                                        onChange={this.changeFirstName} 
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Last Name: </label>
                                    <input 
                                        name='lastName' 
                                        className='form-control' 
                                        placeholder='Last Name' 
                                        value={this.state.lastName} 
                                        onChange={this.changeLastName} 
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Email: </label>
                                    <input 
                                        name='emailId' 
                                        className='form-control' 
                                        placeholder='Email' 
                                        value={this.state.emailId} 
                                        onChange={this.changeEmailId} 
                                    />
                                </div>

                                <button className='btn btn-success' onClick={this.saveEmployee}>
                                    Save
                                </button>

                                <button className='btn btn-danger' onClick={this.cancelSubmit}>
                                    Cancel
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
