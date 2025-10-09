package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Vaga;

public interface VagaRepository extends JpaRepository<Vaga, Long> {
}
