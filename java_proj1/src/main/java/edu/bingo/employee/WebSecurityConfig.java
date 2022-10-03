package edu.bingo.employee;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebFluxSecurity
public class WebSecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return new ProviderManager(Arrays.asList((AuthenticationProvider) new AuthProvider()));
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

        return http.build();
    }
}
