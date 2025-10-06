package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String placaVeiculo;
    private Double valor;
    private String formaPagamento; // Ex: "Cartão", "Dinheiro"
    private String Status; // Ex: "Pendente", "Pago"
    private LocalDateTime dataPagamento;

    // Relacionamento com o cliente
    @ManyToOne
    @JoinColumn
    private Cliente cliente;
}
