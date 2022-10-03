package edu.bingo.employee.service;

import org.springframework.stereotype.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


@Service
public class SecurityService {

    private AuthenticationManager authenticationManager;
    private EmployeeDetailsService employeeDetailsService;

    @Autowired
    public SecurityService(AuthenticationManager authenticationManager, EmployeeDetailsService employeeDetailsService) {
        this.authenticationManager = authenticationManager;
        this.employeeDetailsService = employeeDetailsService;
    }

    public void autoLogin(String username, String password) {
        UserDetails employeeDetails = employeeDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(employeeDetails, password, employeeDetails.getAuthorities());

        authenticationManager.authenticate(token);

        if (token.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(token);
        }
    };

    public Optional<UserDetails> getLoggedInUsername() {
        Object employeeDetails = SecurityContextHolder.getContext().getAuthentication().getDetails();
        return Optional.ofNullable((UserDetails) employeeDetails);
    }
}
