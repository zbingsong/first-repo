package edu.bingo.employee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.repository.EmployeeRepository;


@Service
public class EmployeeDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws ResourceNotFoundException {
        // Get the employee requested
        Employee employee = employeeRepository.findByUsername(username).orElseThrow(
            () -> new ResourceNotFoundException("No such employee exists.")
        );

        return EmployeeDetails.build(employee);
    }
    
}
