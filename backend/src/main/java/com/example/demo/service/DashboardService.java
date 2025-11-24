package com.example.demo.service;

import com.example.demo.model.Pagamento;
import com.example.demo.model.Vaga;
import com.example.demo.repository.PagamentoRepository;
import com.example.demo.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Map<String, Object> obterDadosDashboard() {
        Map<String, Object> dados = new HashMap<>();

        List<Vaga> vagas = vagaRepository.findAll();
        int totalVagas = 150; 
        int vagasLivres = vagas.stream().mapToInt(Vaga::getDisponivel).sum();
        int vagasOcupadas = totalVagas - vagasLivres;

        dados.put("vagasTotal", totalVagas);
        dados.put("vagasOcupadas", vagasOcupadas);
        
        LocalDateTime inicioHoje = LocalDate.now().atStartOfDay();
        LocalDateTime agora = LocalDateTime.now();
        Double receitaHoje = pagamentoRepository.somarReceitaPorPeriodo(inicioHoje, agora);
        dados.put("receitaHoje", receitaHoje);

        List<Pagamento> ultimos = pagamentoRepository.findByDataPagamentoBetweenOrderByDataPagamentoDesc(
                agora.minusDays(30), agora
        );
        dados.put("ultimosPagamentos", ultimos.stream().limit(5).toList());

        List<Integer> ocupacaoSemanal = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 7; i++) {
            
            ocupacaoSemanal.add(random.nextInt(60) + 80); 
        }
        dados.put("graficoSemanal", ocupacaoSemanal);

        List<Double> graficoReceita = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            graficoReceita.add(random.nextDouble() * 500 + 100);
        }
        dados.put("graficoReceita", graficoReceita);

        return dados;
    }
}