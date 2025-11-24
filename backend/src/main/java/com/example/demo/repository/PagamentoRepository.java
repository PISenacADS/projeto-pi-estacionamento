package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Pagamento;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    List<Pagamento> findByStatus(String status);
    List<Pagamento> findByDataPagamentoBetween(LocalDateTime start, LocalDateTime end);
    List<Pagamento> findByDataPagamentoBetweenOrderByDataPagamentoDesc(LocalDateTime inicio, LocalDateTime fim);

    @Query("SELECT COALESCE(SUM(p.valor), 0) FROM Pagamento p WHERE p.status = 'Pago' AND p.dataPagamento BETWEEN :inicio AND :fim")
    Double somarReceitaPorPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
    
    long countByStatus(String status);
}
