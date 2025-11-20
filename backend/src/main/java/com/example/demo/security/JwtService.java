package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // A chave secreta deve ter pelo menos 256 bits (32 caracteres) para o HS256
    private static final String SECRET_KEY = "SeuSegredoSuperSeguroAquiComPeloMenos32CaracteresDeVerdade";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String gerarToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // Token expira em 24 horas (86400000 ms)
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) 
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) 
                .compact();
    }

    public String extrairEmail(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(getSigningKey()) 
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        } catch (Exception e) {
            // Em caso de token inválido ou expirado
            return null;
        }
    }

    public boolean validarToken(String token) {
        try {
            // Tenta extrair o email, se conseguir, o token é válido
            extrairEmail(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}