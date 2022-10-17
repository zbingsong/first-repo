package edu.bingo.employee.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.payload.EmployeeInfo;
import edu.bingo.employee.payload.LoginEmployee;
import edu.bingo.employee.repository.EmployeeRepository;


@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    /*@Autowired
    private SecurityService securityService;*/


    // @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    /*public EmployeeInfo addEmployee(EmployeeInfo registerEmployee) {
        Optional<EmployeeInfo> registerResponse = this.securityService.register(registerEmployee);
        return registerResponse.isPresent() ? registerResponse.get() : null;
    }

    public EmployeeInfo logEmployeeIn(LoginEmployee loginEmployee) {
        Optional<EmployeeInfo> loginResponse = this.securityService.login(loginEmployee);
        return loginResponse.isPresent() ? loginResponse.get() : null;
    }*/

    // @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Employee findEmployeeById(String username) {
        Employee employee = this.employeeRepository.findByUsername(username).orElseThrow(
            () -> new ResourceNotFoundException("Employee not exist with username: " + username)
        );
        return employee;
    }

    /*public Employee updateEmployeeById(String username, Employee updatedEmployee) {
        // Fetch existing employee
        // This Employee object is now in the Managed state
        Employee originalEmployee = this.findEmployeeById(username);
        originalEmployee.setFirstName(updatedEmployee.getFirstName());
        originalEmployee.setLastName(updatedEmployee.getLastName());
        originalEmployee.setEmailId(updatedEmployee.getEmailId());
        // Saving a Managed Employee object will update it
        return this.employeeRepository.save(originalEmployee);
    };*/

    // @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteEmployeeById(String username) {
        Employee employee = this.findEmployeeById(username);
        this.employeeRepository.delete(employee);
        return true;
    }

    // @PreAuthorize("hasRole('ADMIN')")
    public void deleteAllEmployee() {
        this.employeeRepository.deleteAll();
    }
}
