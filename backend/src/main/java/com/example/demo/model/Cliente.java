package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
// Vamos utilizar assim que criar as tabelas no banco
// @Entity
// @Table(name = "clientes")
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)

@Data // Gera automaticamente getters, setters, equals, hashCode e toString
@AllArgsConstructor // Gera construtor com todos os campos
@NoArgsConstructor  // Gera construtor vazio

public class Cliente {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private Double saldo = 0.0;
}
