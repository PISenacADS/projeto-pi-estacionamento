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
      alert('Preencha todos os campos obrigatórios (incluindo e-mail e senha).');
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
        
        
        
        const veiculoParaSalvar = {
          placa: this.cadastroForm.value.placa,
          modelo: this.cadastroForm.value.modelo,
          cor: this.cadastroForm.value.cor,
          situacao: true,
        
          cliente: usuarioCriado 
        };

        
        this.cadastroService.cadastrarVeiculo(veiculoParaSalvar).subscribe({
          next: () => {
            alert('Cadastro Completo Realizado!');
            this.cadastroForm.reset();
            this.router.navigate(['/login']); 
          },
          error: (erroVeiculo) => {
            console.error('Erro ao salvar veículo:', erroVeiculo);
            alert('Usuário criado, mas erro ao salvar veículo.');
          }
        });

      },
      error: (erroUsuario) => {
        console.error('Erro ao salvar usuário:', erroUsuario);
        alert('Erro ao cadastrar usuário. Verifique se o e-mail já existe.');
      }
    });
  }
}