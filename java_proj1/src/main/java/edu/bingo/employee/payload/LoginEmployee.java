package edu.bingo.employee.payload;


public class LoginEmployee {

    private String username;

    private String password;


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
