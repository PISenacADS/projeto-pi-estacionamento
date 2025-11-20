package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Adicione esta importação!
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

// Adicione esta anotação se não estiver
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // A nova forma de desabilitar o CSRF
            .csrf(AbstractHttpConfigurer::disable) 
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Rotas de Cadastro e Login (Auth)
                .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                
                // Rotas de Cadastro de Usuários e Veículos (POST)
                .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/veiculos").permitAll()
                
                // Rotas de Leitura (GET)
                .requestMatchers(HttpMethod.GET, "/api/usuarios/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/veiculos/**").permitAll() 
                .requestMatchers(HttpMethod.GET, "/api/financeiro/**").permitAll()
                
                // Exigir autenticação para qualquer outra coisa (qualquer rota que não está acima)
                .anyRequest().authenticated()
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permite a origem do seu Angular
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); 
        configuration.setAllowedHeaders(Arrays.asList("*")); 
        configuration.setAllowCredentials(true); // Necessário para enviar cookies/tokens
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}