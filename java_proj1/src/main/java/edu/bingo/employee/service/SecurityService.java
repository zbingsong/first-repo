package edu.bingo.employee.service;

import org.springframework.stereotype.Service;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.AvailableRoles;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.model.Role;
import edu.bingo.employee.repository.EmployeeRepository;
import edu.bingo.employee.repository.RoleRepository;

import java.util.HashSet;
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

    @Autowired
    private RoleRepository roleRepository;


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

    
    public Optional<Employee> register(String username, String password, String firstName, String lastName, String emailId, Set<String> employeeRoles) {
        if (this.employeeRepository.existsByUsername(username)) {
            return Optional.empty();
        }

        Employee employee = new Employee(username, password, firstName, lastName, emailId);
        Set<Role> roles = new HashSet<>();

        for (String role: employeeRoles) {
            if (role.equals("admin")) {
                Role newRole = this.roleRepository.findByName(AvailableRoles.ADMIN).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
                roles.add(newRole);
            } else if (role.equals("user")) {
                Role newRole = this.roleRepository.findByName(AvailableRoles.USER).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
                roles.add(newRole);
            } else {
                throw new ResourceNotFoundException("Role not found");
            }
        }

        employee.setRole(roles);
        return Optional.of(this.employeeRepository.save(employee));
    }
}
