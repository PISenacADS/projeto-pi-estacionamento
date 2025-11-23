package com.example.demo.controller;

import com.example.demo.model.Movimentacao;
import com.example.demo.service.MovimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;

    @GetMapping("/usuario/{usuarioId}")
    public List<Movimentacao> listarPorUsuario(@PathVariable Long usuarioId) {
        return movimentacaoService.listarPorUsuario(usuarioId);
    }
}