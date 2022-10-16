package edu.bingo.employee.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.bingo.employee.model.Employee;
import edu.bingo.employee.payload.LoginEmployee;
import edu.bingo.employee.payload.EmployeeInfo;
import edu.bingo.employee.service.EmployeeService;


@RestController
@RequestMapping("/api/v1/employees")
// React.js has default port of 3000
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;


    // Get all employees
    @GetMapping(path = "")
    public List<Employee> getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }

    // Create a new employee
    @PostMapping(path = "/add")
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeInfo registerEmployee) {
        EmployeeInfo registerResponse = this.employeeService.addEmployee(registerEmployee);
        if (registerResponse != null) {
            return ResponseEntity.ok().body(registerResponse);
        } else {
            return ResponseEntity.badRequest().body("Registration failed");
        }
    }


    @PostMapping(path = "/login")
    public ResponseEntity<?> signEmployeeIn(@RequestBody LoginEmployee loginEmployee) {
        EmployeeInfo loginResponse = this.employeeService.logEmployeeIn(loginEmployee);
        if (loginResponse != null) {
            return ResponseEntity.ok().body(loginResponse);
        } else {
            return ResponseEntity.badRequest().body("Login failed");
        }
    }


    @GetMapping(path = "/logout")
    public ResponseEntity<String> signEmployeeOut() {
        return ResponseEntity.ok().body("Logout succeeded");
    }

    // Get an employee by ID
    // ResponseEntity represents an entire HTTP response, instead of a Java object
    @GetMapping(path = "/{username}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("username") String username) {
        Employee employee = employeeService.findEmployeeById(username);
        return ResponseEntity.ok(employee);
    }

    // Update an employee
    @PutMapping(path = "/update/{username}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable("username") String username, @RequestBody Employee updatedEmployee) {
        Employee employee = employeeService.updateEmployeeById(username, updatedEmployee);
        return ResponseEntity.ok(employee);
    }

    // Delete an employee
    @DeleteMapping(path = "/delete/{username}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployeeById(@PathVariable("username") String username) {
        boolean result = this.employeeService.deleteEmployeeById(username);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", result);
        return ResponseEntity.ok(response);
    }

    // Delete all employees/flush the table
    @DeleteMapping(path = "/delete/all")
    public ResponseEntity<String> clearEmployees() {
        this.employeeService.deleteAllEmployee();
        return ResponseEntity.ok("Success");
    }
}
