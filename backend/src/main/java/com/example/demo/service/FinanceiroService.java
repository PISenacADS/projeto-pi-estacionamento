package com.example.demo.service;

import com.example.demo.model.Pagamento;
import com.example.demo.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Double calcularReceitaHoje() {
        LocalDateTime inicio = LocalDate.now().atStartOfDay();
        LocalDateTime fim = LocalDate.now().atTime(23, 59, 59);

        return pagamentoRepository.findByDataPagamentoBetween(inicio, fim)
                .stream()
                .mapToDouble(p -> p.getValor().doubleValue())
                .sum();
    }

    public Double calcularReceitaSemanal() {
        LocalDateTime inicio = LocalDate.now().minusDays(7).atStartOfDay();
        LocalDateTime fim = LocalDate.now().atTime(23, 59, 59);

        return pagamentoRepository.findByDataPagamentoBetween(inicio, fim)
                .stream()
                .mapToDouble(p -> p.getValor().doubleValue())
                .sum();
    }

    public Double calcularReceitaMensal() {
        LocalDateTime inicio = LocalDate.now().minusDays(30).atStartOfDay();
        LocalDateTime fim = LocalDate.now().atTime(23, 59, 59);

        return pagamentoRepository.findByDataPagamentoBetween(inicio, fim)
                .stream()
                .mapToDouble(p -> p.getValor().doubleValue())
                .sum();
    }

    public List<Pagamento> listarPagamentosPendentes() {
        return pagamentoRepository.findByStatus("Pendente");
    }

    public List<Pagamento> listarTodosPagamentos() {
        return pagamentoRepository.findAll();
    }
}
