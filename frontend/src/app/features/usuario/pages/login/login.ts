import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'] 
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiservice: ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      lembrar: [false]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      alert('Por favor, preencha os campos corretamente.');
      return;
    }

    const credenciais = {
      email: this.loginForm.value.email,
      senha: this.loginForm.value.senha
    };

    this.apiservice.login(credenciais).subscribe({
      
      next: (resposta) => {
        console.log('Login bem-sucedido!', resposta);
        
        if (resposta.usuario && resposta.usuario.role === 'ADMIN') { 
          alert('Bem-vindo, Administrador!');
          this.router.navigate(['/admin/dashboard']);

        } else if (resposta.usuario && resposta.usuario.role === 'CLIENTE') {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/usuario/home']); 

        } else {
          console.error('O "role" do usuário não foi encontrado na resposta.');
          alert('Login realizado. Redirecionando...');
          this.router.navigate(['/usuario/home']);
        }
      },
  
      error: (erro) => {
        console.error('ERRO ao logar:', erro);
        alert('❌ ERRO: E-mail ou senha inválidos.');
      }
    });
  }


  
  onRegister(): void {
    this.router.navigate(['/padrao/cadastro']); 
  }
}