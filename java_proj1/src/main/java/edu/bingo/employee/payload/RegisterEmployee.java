package edu.bingo.employee.payload;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import edu.bingo.employee.exception.ResourceNotFoundException;
import edu.bingo.employee.model.AvailableRoles;
import edu.bingo.employee.model.Employee;
import edu.bingo.employee.model.Role;
import edu.bingo.employee.repository.RoleRepository;

public class RegisterEmployee {

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String emailId;

    private List<String> roles;

    @Autowired
    private RoleRepository roleRepository;


    public RegisterEmployee() {

    }

    public RegisterEmployee(String username, String password, String firstName, String lastName, String emailId, List<String> roles) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.roles = roles;
    }


    public Employee toEmployee() {
        Employee employee = new Employee(this.username, this.password, this.firstName, this.lastName, this.emailId);
        Set<Role> rolesSet = new HashSet<>();

        for (String role: this.roles) {
            if (role.equals("admin")) {
                Role newRole = this.roleRepository.findByName(AvailableRoles.ADMIN)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
                rolesSet.add(newRole);
            } else if (role.equals("user")) {
                Role newRole = this.roleRepository.findByName(AvailableRoles.USER)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
                rolesSet.add(newRole);
            } else {
                throw new ResourceNotFoundException("Role not found");
            }
        }
        employee.setRole(rolesSet);
        return employee;
    }

    public static RegisterEmployee toRegisterEmployee(Employee employee) {
        List<String> roles = employee.getRole()
            .stream()
            .map(role -> role.getName().name())
            .collect(Collectors.toList());
        return new RegisterEmployee(employee.getUsername(), employee.getPassword(), employee.getFirstName(), employee.getLastName(), employee.getEmailId(), roles);
    }
}
