package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.model.Veiculo;
import com.example.demo.repository.UsuarioRepository; // IMPORTANTE
import com.example.demo.repository.VeiculoRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository; 

    @Autowired
    private UsuarioRepository usuarioRepository; 

    public List<Veiculo> listarVeiculos() {
        return veiculoRepository.findAll(); 
    }

    public Veiculo buscarPorId(Long id) {
        return veiculoRepository.findById(id).orElse(null);
    }

    public Veiculo adicionarVeiculo(Veiculo veiculo) {
        
        if (veiculo.getUsuario() != null && veiculo.getUsuario().getId() != null) {
            
            Usuario usuarioReal = usuarioRepository.findById(veiculo.getUsuario().getId()).orElse(null);
            
            if (usuarioReal != null) {
                veiculo.setUsuario(usuarioReal);
            }
        }
        
        return veiculoRepository.save(veiculo);
    }

    public Veiculo atualizarVeiculo(Long id, Veiculo veiculoAtualizado) {
        Veiculo veiculoExistente = veiculoRepository.findById(id).orElse(null);
        if (veiculoExistente != null) {
            veiculoExistente.setPlaca(veiculoAtualizado.getPlaca());
            veiculoExistente.setModelo(veiculoAtualizado.getModelo());
            veiculoExistente.setCor(veiculoAtualizado.getCor());
            veiculoExistente.setSituacao(veiculoAtualizado.isSituacao());
            
            if (veiculoAtualizado.getUsuario() != null) {
                veiculoExistente.setUsuario(veiculoAtualizado.getUsuario());
            }
            
            return veiculoRepository.save(veiculoExistente);
        }
        return null;
    }

    public boolean removerVeiculo(Long id) {
        if (veiculoRepository.existsById(id)) {
            veiculoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}