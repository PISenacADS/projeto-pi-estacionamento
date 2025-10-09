package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private VagaRepository vagaRepository;

    public Reserva criarReserva(Reserva reserva) {
        Vaga vaga = vagaRepository.findById(reserva.getVaga().getId())
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

        if (!vaga.isDisponivel()) {
            throw new RuntimeException("Vaga já ocupada!");
        }

        long horas = Duration.between(reserva.getDataEntrada(), reserva.getDataSaida()).toHours();
        double valor = horas * vaga.getPrecoHora();

        reserva.setValorTotal(valor);

        vaga.setDisponivel(false);
        vagaRepository.save(vaga);

        return reservaRepository.save(reserva);
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva buscarPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
    }
}
