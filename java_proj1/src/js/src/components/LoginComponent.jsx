import React from 'react'
import EmployeeService from '../services/EmployeeService'

export default class CreateEmployeeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    saveEmployee = event => {
        event.preventDefault()
        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
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
                            Login
                        </h3>

                        {
                            this.props.params
                            <h5>

                            </h5>
                        }

                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Username: </label>
                                    <input 
                                        name='firstName' 
                                        className='form-control' 
                                        placeholder='First Name' 
                                        value={this.state.firstName} 
                                        onChange={this.changeFirstName} 
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Password: </label>
                                    <input 
                                        name='lastName' 
                                        className='form-control' 
                                        placeholder='Last Name' 
                                        value={this.state.lastName} 
                                        onChange={this.changeLastName} 
                                    />
                                </div>

                                <button className='btn btn-success' onClick={this.saveEmployee}>
                                    Sign in
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