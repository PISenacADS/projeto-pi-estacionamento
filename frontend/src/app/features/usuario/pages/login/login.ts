import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'] 
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
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

    console.log('Login bem-sucedido! Dados:', this.loginForm.value);
    alert('✅ Login realizado com sucesso!');
    this.loginForm.reset();
  }
  
  onRegister(): void {
    console.log('Navegando para a página de cadastro...');
    this.router.navigate(['/caminho-para-o-cadastro']); 
  }
}