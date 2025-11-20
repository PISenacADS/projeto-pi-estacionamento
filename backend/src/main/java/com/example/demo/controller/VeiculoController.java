package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Veiculo;
import com.example.demo.service.VeiculoService;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin(origins = "*")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public List<Veiculo> listarVeiculos() {
        return veiculoService.listarVeiculos();
    }

    @GetMapping("/{id}")
    public Veiculo buscarPorId(@PathVariable Long id) {
        return veiculoService.buscarPorId(id);
    }

    @PostMapping
    public Veiculo adicionarVeiculo(@RequestBody Veiculo veiculo) {
        return veiculoService.adicionarVeiculo(veiculo);
    }

    @PutMapping("/{id}")
    public Veiculo atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculo) {
        return veiculoService.atualizarVeiculo(id, veiculo);
    }

    
    @DeleteMapping("/{id}")
    public String removerVeiculo(@PathVariable Long id) {
        boolean removido = veiculoService.removerVeiculo(id);
        return removido ? "Veículo removido com sucesso!" : "Veículo não encontrado.";
    }
}
