import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { VeiculoService } from '../../../admin/pages/automovel/services/veiculo.service';
import { PerfilService } from '../perfil/services/perfil.service';



@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro2.html', 
  styleUrl: './cadastro2.scss'
})
export class Cadastro2Component implements OnInit {

  veiculoForm!: FormGroup;
  usuarioId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.minLength(7)]], 
      cor: ['', Validators.required]
    });

    this.carregarUsuarioLogado();
  }

  carregarUsuarioLogado() {
    const email = this.perfilService.getEmailDoToken();
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (dados) => {
          this.usuarioId = dados.id; 
        },
        error: (err) => console.error('Erro ao identificar usuário', err)
      });
    }
  }

  onSubmit() {
    if (this.veiculoForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    if (!this.usuarioId) {
      alert('Erro: Usuário não identificado. Tente logar novamente.');
      return;
    }

    const novoVeiculo = {
      modelo: this.veiculoForm.value.modelo,
      placa: this.veiculoForm.value.placa,
      cor: this.veiculoForm.value.cor, 
      situacao: true, 
      
      usuario: {
        id: this.usuarioId
      }
    };

    this.veiculoService.adicionarVeiculo(novoVeiculo).subscribe({
      next: () => {
        alert(' Veículo cadastrado com sucesso!');
        this.router.navigate(['/usuario/perfil']); 
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao cadastrar veículo.');
      }
    });
  }
}