import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroComponente implements OnInit {

  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({

      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      lembrar: [false] 
    }, {
      validator: this.senhasCoincidem
    });
  }

  onSubmit(): void {
    this.cadastroForm.markAllAsTouched(); 

    if (this.cadastroForm.invalid) {
      alert('ERRO: Por favor, verifique os campos do formulário.');
      return;
    }

    const dadosParaApi = {
      nome: this.cadastroForm.value.nome,
      email: this.cadastroForm.value.email,
      telefone: this.cadastroForm.value.telefone,
      senha: this.cadastroForm.value.senha,
      role: 'CLIENTE' 
    };

    this.apiservice.registrar(dadosParaApi).subscribe({

      next: (resposta) => {
        console.log('Cadastro realizado com sucesso!', resposta);
        alert('Cadastro realizado com sucesso! Faça o login agora.');
        
        this.cadastroForm.reset(); 
        
        this.router.navigate(['/padrao/login']);
      },

      error: (erro) => {
        console.error('ERRO ao cadastrar:', erro);
        alert('❌ ERRO: Não foi possível realizar o cadastro. O e-mail já pode estar em uso.');
      }
    });
  }

  senhasCoincidem(form: FormGroup) {
    const senha = form.get('senha')?.value;
    const confirmarSenha = form.get('confirmarSenha')?.value;

    if (senha !== confirmarSenha) {
      form.get('confirmarSenha')?.setErrors({ senhasNaoCoincidem: true });
      return { senhasNaoCoincidem: true };
    } else {
      return null; 
    }
  }
}