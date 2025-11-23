package com.example.demo.service;

import com.example.demo.model.Movimentacao;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimentacaoService {

    private List<Movimentacao> movimentacoes = new ArrayList<>();

    public MovimentacaoService() {
        movimentacoes.add(new Movimentacao(1L, "ABC-1234", LocalDateTime.now().minusMinutes(30), null, null, true, 1L));
        
        movimentacoes.add(new Movimentacao(2L, "XYZ-9876", LocalDateTime.now().minusDays(1).minusHours(2), LocalDateTime.now().minusDays(1), 15.50, false, 1L));

        movimentacoes.add(new Movimentacao(3L, "OUT-9999", LocalDateTime.now(), null, null, true, 99L));
    }

    public List<Movimentacao> listarPorUsuario(Long usuarioId) {
        return movimentacoes.stream()
                .filter(m -> m.getUsuarioId().equals(usuarioId))
                .collect(Collectors.toList());
    }
}