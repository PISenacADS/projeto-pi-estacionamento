package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Veiculo;

@Service
public class VeiculoService {

    private List<Veiculo> veiculos= new ArrayList<>();

    public VeiculoService(){
        veiculos.add(new Veiculo(1L, "CRI-2578", "Vectra", "LAranja",true));
    }
    
}
