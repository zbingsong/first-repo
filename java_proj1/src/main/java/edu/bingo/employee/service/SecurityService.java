package edu.bingo.employee.service;

import org.springframework.stereotype.Service;

import edu.bingo.employee.model.Employee;
import edu.bingo.employee.payload.EmployeeInfo;
import edu.bingo.employee.payload.LoginEmployee;
import edu.bingo.employee.repository.EmployeeRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class SecurityService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder encoder;


    public Optional<EmployeeInfo> login(LoginEmployee loginEmployee) {
        String username = loginEmployee.getUsername();
        String password = this.encoder.encode(loginEmployee.getPassword());

        // If employee doesn't exist, return an empty Optional
        if (!this.employeeRepository.existsByUsername(username)) {
            return Optional.empty();
        }

        // Authenticate the employee if username exists
        UserDetails employeeDetails = this.employeeDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(employeeDetails, password, employeeDetails.getAuthorities());
        Authentication auth = this.authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Retrieve and return employee's info
        Employee employee = this.employeeRepository.findByUsername(username).get();
        return Optional.of(EmployeeInfo.toEmployeeInfo(employee));
    }


    public Optional<EmployeeInfo> register(EmployeeInfo registerEmployee) {
        if (this.employeeRepository.existsByUsername(registerEmployee.getUsername())) {
            return Optional.empty();
        }

        Employee employee = registerEmployee.toEmployee();
        return Optional.of(
            EmployeeInfo.toEmployeeInfo(this.employeeRepository.save(employee))
        );
    }
}
