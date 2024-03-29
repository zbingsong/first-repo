package edu.bingo.employee.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "employee", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class Employee {

    @Id
    @Column(name = "username", length = 32)
    private String username;

    @NotBlank
    @Column(name = "first_name", length = 32)
    private String firstName;

    @NotBlank
    @Column(name = "last_name", length = 32)
    private String lastName;

    @NotBlank
    @Column(name = "email_id", length = 128)
    private String emailId;

    @NotBlank
    @Column(name = "password")
    private String password;

    @Transient
    // @Transient means this instance variable is not saved to database
    private String passwordConfirm;

    // Create a M:N relationship between this table and Role table, specify references
    @NotBlank
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
        name = "employee_role", 
        joinColumns = @JoinColumn(name = "employee_username"), 
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> role;


    public Employee() {

    }

    public Employee(String username, String password, String firstName, String lastName, String emailId) {

        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
    }

    
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return this.emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Set<Role> getRole() {
        return this.role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }
}
