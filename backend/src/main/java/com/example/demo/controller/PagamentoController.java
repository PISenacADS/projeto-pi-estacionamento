package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.service.PagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagamentos")
@CrossOrigin(origins = "*")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @PostMapping("/adicionar")
    public Usuario adicionarSaldo(@RequestBody DepositoRequest request) {
        return pagamentoService.adicionarSaldo(request.usuarioId, request.valor);
    }

    public static class DepositoRequest {
        public Long usuarioId;
        public Double valor;
    }
}