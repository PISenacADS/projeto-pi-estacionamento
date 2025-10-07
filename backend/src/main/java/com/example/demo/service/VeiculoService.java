package com.example.demo.service;

import com.example.demo.model.Veiculo;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class VeiculoService {

    private List<Veiculo> veiculos = new ArrayList<>();

   public VeiculoService() {
    veiculos.add(new Veiculo(1L, "CRI-2578", "Vectra", "Laranja", true,null));
    veiculos.add(new Veiculo(2L, "XYZ-1234", "Civic", "Preto", false,null));
    veiculos.add(new Veiculo(3L, "GHI-7777", "Corolla", "Branco", true,null));
}

    public List<Veiculo> listarVeiculos() {
        return veiculos;
    }
}
