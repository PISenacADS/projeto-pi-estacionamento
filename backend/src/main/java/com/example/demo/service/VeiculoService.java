package com.example.demo.service;

import com.example.demo.model.Veiculo;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class VeiculoService {

    private final List<Veiculo> veiculos = new ArrayList<>();

    public VeiculoService() {
        veiculos.add(new Veiculo(1L, "CRI-2578", "Vectra", "Laranja", true, null));
        veiculos.add(new Veiculo(2L, "XYZ-1234", "Civic", "Preto", false, null));
        veiculos.add(new Veiculo(3L, "GHI-7777", "Corolla", "Branco", true, null));
    }

    public List<Veiculo> listarVeiculos() {
        return veiculos;
    }

    public Veiculo buscarPorId(Long id) {
        return veiculos.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Veiculo adicionarVeiculo(Veiculo veiculo) {
        veiculo.setId((long) (veiculos.size() + 1));
        veiculos.add(veiculo);
        return veiculo;
    }

    public Veiculo atualizarVeiculo(Long id, Veiculo veiculoAtualizado) {
        Veiculo veiculoExistente = buscarPorId(id);
        if (veiculoExistente != null) {
            veiculoExistente.setPlaca(veiculoAtualizado.getPlaca());
            veiculoExistente.setModelo(veiculoAtualizado.getModelo());
            veiculoExistente.setCor(veiculoAtualizado.getCor());
            veiculoExistente.setSituacao(veiculoAtualizado.isSituacao());
            return veiculoExistente;
        }
        return null;
    }
//Lembrar de tentar testar este ultimo metodo
    public boolean removerVeiculo(Long id) {
        return veiculos.removeIf(v -> v.getId().equals(id));
    }
}
