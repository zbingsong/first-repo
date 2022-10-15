package edu.bingo.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import edu.bingo.employee.service.EmployeeDetailsService;

@Configuration
@EnableWebFluxSecurity
public class WebSecurityConfig {

    @Autowired
    private EmployeeDetailsService employeeDetailsService;


    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        /*
         * Doesn't require authentication on path "" and "/index" (home page)
         * The login page is set to "/login"
         */
        http.authorizeHttpRequests(
                requests -> requests.antMatchers("", "/index")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            )
            .formLogin(
                form -> form.loginPage("/login")
                    .permitAll()
            )
            .logout(
                logout -> logout.permitAll()
            );
        
        http.authenticationProvider(this.authenticationProvider());

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(employeeDetailsService);
        authProvider.setPasswordEncoder(this.passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
