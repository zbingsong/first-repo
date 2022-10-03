package edu.bingo.employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.repository.EmployeeRepository;


@Service
public class EmployeeService {
    
    private EmployeeRepository employeeRepository;
    // private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
        // this.passwordEncoder = passwordEncoder;
    }

    public List<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee) {
        // employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return this.employeeRepository.save(employee);
    }

    public Employee findEmployeeById(String username) {
        Employee employee = this.employeeRepository.findById(username).orElseThrow(
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
        originalEmployee.setPrivilegeLevel(updatedEmployee.getPrivilegeLevel());
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
