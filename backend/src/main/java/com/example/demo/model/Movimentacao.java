package com.example.demo.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movimentacao {
    private Long id;               
    private String placa;         
    private LocalDateTime entrada; 
    private LocalDateTime saida;  
    private Double valor;    
    private boolean ativa; 
}
