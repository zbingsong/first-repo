package edu.bingo.employee.payload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class LoginEmployee {

    private String username;

    private String password;

    @Autowired
    PasswordEncoder encoder;

    public LoginEmployee() {

    }

    public LoginEmployee(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }
}
