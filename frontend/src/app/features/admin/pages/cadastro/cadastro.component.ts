import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CadastroService } from './services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      
      placa: ['', [Validators.required, Validators.minLength(7)]],
      modelo: ['', [Validators.required]],
      cor: ['', [Validators.required]]
    });
  }

  cadastrar(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const usuarioParaSalvar = {
      nome: this.cadastroForm.value.nome,
      email: this.cadastroForm.value.email,
      telefone: this.cadastroForm.value.telefone,
      senha: this.cadastroForm.value.senha,
      role: 'CLIENTE'
    };

    this.cadastroService.cadastrarUsuario(usuarioParaSalvar).subscribe({
      next: (usuarioCriado) => {
        
        console.log('Usuário criado com ID:', usuarioCriado.id);

        const veiculoParaSalvar = {
          placa: this.cadastroForm.value.placa,
          modelo: this.cadastroForm.value.modelo,
          cor: this.cadastroForm.value.cor,
          situacao: true, 
          
          usuario: { 
            id: usuarioCriado.id 
          }
        };

        this.cadastroService.cadastrarVeiculo(veiculoParaSalvar).subscribe({
          next: () => {
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            this.cadastroForm.reset();
            this.router.navigate(['/admin/usuario']);
          },
          error: (erroVeiculo) => {
            console.error('Erro ao salvar veículo:', erroVeiculo);
            alert('Usuário criado, mas houve um erro ao salvar o veículo. Tente cadastrar o veículo pelo painel.');
            this.router.navigate(['/admin/cadastro']);
          }
        });

      },
      error: (erroUsuario) => {
        console.error('Erro ao salvar usuário:', erroUsuario);
        if (erroUsuario.status === 409 || (erroUsuario.error && erroUsuario.error.message?.includes('email'))) {
             alert('Erro: Este e-mail já está cadastrado.');
        } else {
             alert('Erro ao realizar cadastro. Tente novamente.');
        }
      }
    });
  }
}