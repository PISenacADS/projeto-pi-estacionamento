package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PagamentoRepository pagamentoRepository;

    // --- MÉTODOS DE LEITURA ---

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        // Retorna null se não encontrar (mais seguro para o controller)
        return usuarioRepository.findById(id).orElse(null);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // --- MÉTODOS DE AÇÃO ---

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuarioExistente = buscarPorId(id);
        if (usuarioExistente != null) {
            usuarioExistente.setNome(usuarioAtualizado.getNome());
            usuarioExistente.setEmail(usuarioAtualizado.getEmail());
            usuarioExistente.setTelefone(usuarioAtualizado.getTelefone());
            
            // Só atualiza a senha se o usuário digitou uma nova
            if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
                usuarioExistente.setSenha(usuarioAtualizado.getSenha());
            }
            return usuarioRepository.save(usuarioExistente);
        }
        return null;
    }

    // ✅ MÉTODO DE DELETAR COMPLETO (Remove tudo que é do usuário)
    @Transactional
    public void deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            
            // 1. Apagar Pagamentos do Usuário
            // (Varre todos os pagamentos e apaga os que são deste usuário)
            List<Pagamento> pagamentos = pagamentoRepository.findAll();
            for (Pagamento p : pagamentos) {
                if (p.getUsuario() != null && p.getUsuario().getId().equals(id)) {
                    pagamentoRepository.delete(p);
                }
            }

            // 2. Apagar Reservas do Usuário
            // (Tenta usar o método otimizado do repositório)
            try {
                List<Reserva> reservas = reservaRepository.findByUsuarioIdOrderByDataEntradaDesc(id);
                reservaRepository.deleteAll(reservas);
            } catch (Exception e) {
                // Fallback caso o método não exista
                List<Reserva> todas = reservaRepository.findAll();
                for (Reserva r : todas) {
                    if (r.getUsuario() != null && r.getUsuario().getId().equals(id)) {
                        reservaRepository.delete(r);
                    }
                }
            }

            // 3. Apagar Veículos do Usuário
            List<Veiculo> veiculos = veiculoRepository.findByUsuarioId(id);
            veiculoRepository.deleteAll(veiculos);

            // 4. Finalmente, apaga o Usuário
            usuarioRepository.deleteById(id);
        }
    }
}