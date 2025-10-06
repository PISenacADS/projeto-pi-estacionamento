package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    List<Pagamento> findByStatus(String status);
    List<Pagamento> findByDataPagamentoBetween(LocalDateTime start, LocalDateTime end);
}
