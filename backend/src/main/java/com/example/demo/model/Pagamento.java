package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
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

    @Column(nullable = false)
    private String placaVeiculo;

    @Column(nullable = false)
    private BigDecimal valor;

    private String formaPagamento; // Ex: "Cartão", "Dinheiro"
    private String status; // Ex: "Pendente", "Pago"
    private LocalDateTime dataPagamento;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
