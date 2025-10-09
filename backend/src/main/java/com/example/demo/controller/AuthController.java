package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return authService.registrar(usuario);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credenciais) {
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");
        return authService.login(email, senha);
    }
}
