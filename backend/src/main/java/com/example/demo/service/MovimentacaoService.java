package com.example.demo.service;

import com.example.demo.model.Movimentacao;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovimentacaoService {

    private List<Movimentacao> movimentacoes = new ArrayList<>();

    public MovimentacaoService() {
        movimentacoes.add(new Movimentacao(1L, "CRI-2578", LocalDateTime.now().minusHours(2), null, null, true));
        movimentacoes.add(new Movimentacao(2L, "XYZ-1234", LocalDateTime.now().minusHours(3), LocalDateTime.now().minusHours(1), 25.0, false));
    }
}