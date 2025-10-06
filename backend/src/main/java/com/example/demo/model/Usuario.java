package com.example.demo.model;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Entity
// @Table(name = "usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String tipo;
    private boolean ativo;
}
