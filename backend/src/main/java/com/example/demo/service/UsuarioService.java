package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        
        return usuarioRepository.findById(id).orElse(null);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }


    public Usuario salvar(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

     public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuarioExistente = buscarPorId(id);
        
        if (usuarioExistente != null) {
            usuarioExistente.setNome(usuarioAtualizado.getNome());
            usuarioExistente.setEmail(usuarioAtualizado.getEmail());
            usuarioExistente.setTelefone(usuarioAtualizado.getTelefone());
            
            if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
                
                String senhaCriptografada = passwordEncoder.encode(usuarioAtualizado.getSenha());
                usuarioExistente.setSenha(senhaCriptografada);
            }
            
            return usuarioRepository.save(usuarioExistente);
        }
        return null;
    }

    @Transactional
    public void deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            
            List<Pagamento> pagamentos = pagamentoRepository.findAll();
            for (Pagamento p : pagamentos) {
                if (p.getUsuario() != null && p.getUsuario().getId().equals(id)) {
                    pagamentoRepository.delete(p);
                }
            }

            try {
                List<Reserva> reservas = reservaRepository.findByUsuarioIdOrderByDataEntradaDesc(id);
                reservaRepository.deleteAll(reservas);
            } catch (Exception e) {
                
                List<Reserva> todas = reservaRepository.findAll();
                for (Reserva r : todas) {
                    if (r.getUsuario() != null && r.getUsuario().getId().equals(id)) {
                        reservaRepository.delete(r);
                    }
                }
            }

            List<Veiculo> veiculos = veiculoRepository.findByUsuarioId(id);
            veiculoRepository.deleteAll(veiculos);

            usuarioRepository.deleteById(id);
        }
    }
}