package com.example.demo.service;

import com.example.demo.model.Pagamento;
import com.example.demo.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Double calcularReceitaHoje() {
        LocalDateTime inicio = LocalDate.now().atStartOfDay();
        LocalDateTime fim = LocalDate.now().atTime(LocalTime.MAX); 

        return pagamentoRepository.somarReceitaPorPeriodo(inicio, fim);
    }

    public Double calcularReceitaSemanal() {
        LocalDateTime inicio = LocalDate.now().minusDays(7).atStartOfDay();
        LocalDateTime fim = LocalDate.now().atTime(LocalTime.MAX);

        return pagamentoRepository.somarReceitaPorPeriodo(inicio, fim);
    }

    public Double calcularReceitaMensal() {
        LocalDateTime inicio = LocalDate.now().withDayOfMonth(1).atStartOfDay(); 
        LocalDateTime fim = LocalDate.now().atTime(LocalTime.MAX);

        return pagamentoRepository.somarReceitaPorPeriodo(inicio, fim);
    }

    public List<Pagamento> listarPagamentosPendentes() {
       
        return pagamentoRepository.findByStatus("Pendente");
    }

    public List<Pagamento> listarTodosPagamentos() {
        LocalDateTime trintaDiasAtras = LocalDateTime.now().minusDays(30);
        LocalDateTime agora = LocalDateTime.now();
      
        return pagamentoRepository.findByDataPagamentoBetweenOrderByDataPagamentoDesc(trintaDiasAtras, agora);
    }
}