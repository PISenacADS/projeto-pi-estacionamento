package com.example.demo.model;
// teste para commit

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    private Long id;

    private String placa;
    private String modelo;
    private String cor;

    private boolean situacao;
        
}

