package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagamentoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario adicionarSaldo(Long usuarioId, Double valor) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Double novoSaldo = (usuario.getSaldo() == null ? 0.0 : usuario.getSaldo()) + valor;
        usuario.setSaldo(novoSaldo);

        return usuarioRepository.save(usuario);
    }
}