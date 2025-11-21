// package com.example.demo.service;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;
// import com.example.demo.model.Cliente;
// import org.springframework.stereotype.Service;


// @Service
// public class ClienteService {

//     private List<Cliente> clientes = new ArrayList<>();

//     public ClienteService() {
//     clientes.add(new Cliente(1L, "João Costa", "joao@email.com", "(11)11111-1111", 50.0, null));
//     clientes.add(new Cliente(2L, "Gabriel Sobral", "maria@email.com", "(11)11111-1111", 75.0, null));
// }

//     public List<Cliente> listarClientes() {
//         return clientes;
//     }

//     public Optional<Cliente> buscarPorId(Long id) {
//         return clientes.stream().filter(c -> c.getId().equals(id)).findFirst();
//     }

//     public Cliente cadastrarCliente(Cliente cliente) {
//         cliente.setId((long) (clientes.size() + 1));
//         clientes.add(cliente);
//         return cliente;
//     }

//     public void adicionarSaldo(Long id, Double valor) {
//         buscarPorId(id).ifPresent(cliente -> cliente.setSaldo(cliente.getSaldo() + valor));
//     }
// }
