package edu.bingo.employee.service;

import org.springframework.stereotype.Service;

import edu.bingo.employee.model.Employee;
import edu.bingo.employee.repository.EmployeeRepository;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


@Service
public class SecurityService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @Autowired
    private EmployeeRepository employeeRepository;


    public boolean login(String username, String password) {
        UserDetails employeeDetails = this.employeeDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(employeeDetails, password, employeeDetails.getAuthorities());
        Authentication auth = this.authenticationManager.authenticate(token);

        SecurityContextHolder.getContext().setAuthentication(auth);
        return true;
    }

    public void autoLogin(String username, String password) {
        UserDetails employeeDetails = this.employeeDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(employeeDetails, password, employeeDetails.getAuthorities());

        this.authenticationManager.authenticate(token);

        if (token.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(token);
        }
    };

    public Optional<UserDetails> getLoggedInUsername() {
        Object employeeDetails = SecurityContextHolder.getContext().getAuthentication().getDetails();
        return Optional.ofNullable((UserDetails) employeeDetails);
    }

    public boolean register(String username, String password, String firstName, String lastName, String emailId, Set<String> roles) {
        if (employeeRepository.existsByUsername(username)) {
            return false;
        }

        Employee employee = new Employee(username, password, firstName, lastName, emailId);


        return true;
    }
}
