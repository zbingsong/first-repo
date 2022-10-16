package edu.bingo.employee.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.repository.EmployeeRepository;


@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SecurityService securityService;


    public List<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    public Employee addEmployee(String username, String password, String firstName, String lastName, String emailId, Set<String> roles) {
        Optional<Employee> employee = this.securityService.register(username, password, firstName, lastName, emailId, roles);
        return employee.isPresent() ? employee.get() : null;
    }

    public Employee findEmployeeById(String username) {
        Employee employee = this.employeeRepository.findByUsername(username).orElseThrow(
            () -> new ResourceNotFoundException("Employee not exist with username: " + username)
        );
        return employee;
    }

    public Employee updateEmployeeById(String username, Employee updatedEmployee) {
        // Fetch existing employee
        // This Employee object is now in the Managed state
        Employee originalEmployee = this.findEmployeeById(username);
        originalEmployee.setFirstName(updatedEmployee.getFirstName());
        originalEmployee.setLastName(updatedEmployee.getLastName());
        originalEmployee.setEmailId(updatedEmployee.getEmailId());
        // Saving a Managed Employee object will update it
        return this.employeeRepository.save(originalEmployee);
    };

    public boolean deleteEmployeeById(String username) {
        Employee employee = this.findEmployeeById(username);
        this.employeeRepository.delete(employee);
        return true;
    }

    public void deleteAllEmployee() {
        this.employeeRepository.deleteAll();
    }
}
