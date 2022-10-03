package edu.bingo.employee.service;

import java.util.Set;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.repository.EmployeeRepository;


public class EmployeeDetailsService implements UserDetailsService {

    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeDetailsService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public UserDetails loadUserByUsername(String username) {
        Employee employee = employeeRepository.findById(username).orElseThrow(
            () -> new ResourceNotFoundException("No such employee exists.")
        );

        Set<GrantedAuthority> authorities = new HashSet<>();

        authorities.add(new SimpleGrantedAuthority("" + employee.getPrivilegeLevel()));

        return new User(employee.getUsername(), employee.getPassword(), authorities);
    }
    
}
