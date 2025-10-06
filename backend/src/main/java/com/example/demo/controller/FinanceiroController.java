package com.example.demo.controller;

import com.example.demo.model.Pagamento;
import com.example.demo.service.FinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/financeiro")
public class FinanceiroController {

    @Autowired
    private FinanceiroService financeiroService;

    @GetMapping("/resumo")
    public Map<String, Object> getResumoFinanceiro() {
        return Map.of(
                "receitaHoje", financeiroService.calcularReceitaHoje(),
                "receitaSemanal", financeiroService.calcularReceitaSemanal(),
                "receitaMensal", financeiroService.calcularReceitaMensal(),
                "pagamentosPendentes", financeiroService.listarPagamentosPendentes().size()
        );
    }

    @GetMapping("/pagamentos")
    public List<Pagamento> listarPagamentos() {
        return financeiroService.listarTodosPagamentos();
    }
}
