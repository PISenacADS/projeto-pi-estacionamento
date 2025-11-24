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


    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva buscarPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
    }
    
    public List<Reserva> listarPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioIdOrderByDataEntradaDesc(usuarioId);
    }


    public Reserva criarReserva(Reserva reserva) {
        Vaga vaga = vagaRepository.findById(reserva.getVaga().getId())
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

        if (vaga.getDisponivel() <= 0) {
             throw new RuntimeException("Estacionamento lotado!");
        }
        
        long horas = Duration.between(reserva.getDataEntrada(), reserva.getDataSaida()).toHours();
        if(horas < 1) horas = 1;
        
        double valor = horas * vaga.getPrecoHora();
        reserva.setValorTotal(valor);

        vaga.setDisponivel(vaga.getDisponivel() - 1);
        vagaRepository.save(vaga);

        return reservaRepository.save(reserva);
    }

    public Reserva prolongarReserva(Long id) {
      
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

        reserva.setDataSaida(reserva.getDataSaida().plusHours(1));

        if (reserva.getVaga() != null) {
            Double precoHora = reserva.getVaga().getPrecoHora();
           
            if (precoHora == null) precoHora = 5.0; 
            
            reserva.setValorTotal(reserva.getValorTotal() + precoHora);
        }

        return reservaRepository.save(reserva);
    }
}