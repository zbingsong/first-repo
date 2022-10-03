import Axios from 'axios'

// URL of the Spring API
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees"

class EmployeeService {

    getEmployees = () => {
        // Send a GET request to the base URL
        // Return a Promise
        return Axios.get(EMPLOYEE_API_BASE_URL)
    }

    addEmployee = employee => {
        // Send a POST request to the /add URL with request body being employee
        return Axios.post(EMPLOYEE_API_BASE_URL + '/add', employee)
    }

    getEmployeeById = username => {
        // Return a Promise
        return Axios.get(EMPLOYEE_API_BASE_URL + `/${username}`)
    }

    updateEmployee = (updatedEmployee, username) => {
        const employee = this.getEmployeeById(username)
        employee.firstName = updatedEmployee.firstName
        return Axios.put(EMPLOYEE_API_BASE_URL + `/update/${username}`, employee)
    }

    deleteEmployee = username => {
        return Axios.delete(EMPLOYEE_API_BASE_URL + `/delete/${username}`)
    }

    deleteAll = () => {
        return Axios.delete(EMPLOYEE_API_BASE_URL + '/delete/all')
    }
}

// Export an instance of the class 
// so that we can directly call the function getEmployees()
// instead of having to instantiate it first.
export default new EmployeeService();