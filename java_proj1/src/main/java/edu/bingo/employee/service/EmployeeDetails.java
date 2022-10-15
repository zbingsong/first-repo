package edu.bingo.employee.service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import edu.bingo.employee.model.Employee;

public class EmployeeDetails implements UserDetails {

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String emailId;

    private List<GrantedAuthority> authorities;

    @Autowired
    public EmployeeDetails(String username, String password, String firstName, String lastName, String emailId, List<GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.authorities = authorities;
    }


    public static EmployeeDetails build(Employee employee) {
        List<GrantedAuthority> authorities = employee.getRole()
            .stream()
            .map(role -> new SimpleGrantedAuthority(role.getName().name()))
            .collect(Collectors.toList());
        
        return new EmployeeDetails(employee.getUsername(), employee.getPassword(), employee.getFirstName(), employee.getLastName(), employee.getEmailId(), authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getEmailId() {
        return this.emailId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
