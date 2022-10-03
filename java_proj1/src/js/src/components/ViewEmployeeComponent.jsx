import React from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ViewEmployeeComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.match.params.username,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.username)
            .then(response => {
                this.setState({employee: response.data})
            })
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>

                        <h3 className='text-center'>View Employee</h3>

                        <div className='card-body'>
                        <div className='row'>
                                <span>Employee Username: {this.state.employee.username}</span>
                            </div>

                            <div className='row'>
                                <span>Employee First Name: {this.state.employee.firstName}</span>
                            </div>

                            <div className='row'>
                                <span>Employee Last Name: {this.state.employee.lastName}</span>
                            </div>

                            <div className='row'>
                                <span>Employee Email: {this.state.employee.emailId}</span>
                            </div>

                            <div className='row'>
                                <span>Employee Privilege Level: {this.state.employee.privilegeLevel}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
