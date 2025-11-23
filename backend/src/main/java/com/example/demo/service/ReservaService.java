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

    @SuppressWarnings("unused")
    public Reserva criarReserva(Reserva reserva) {
    Vaga vaga = vagaRepository.findById(reserva.getVaga().getId())
            .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

    if (vaga.getDisponivel() <= 0) {
        throw new RuntimeException("Estacionamento lotado para este tipo de vaga!");
    }

    long horas = Duration.between(reserva.getDataEntrada(), reserva.getDataSaida()).toHours();

    vaga.setDisponivel(vaga.getDisponivel() - 1);
    
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
