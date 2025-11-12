import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    if (email == 'admin@gmail.com' && senha == 1234){
      
      this.router.navigate (['admin/dashboard']);
      this.loginForm.reset();
    } else {
      alert('Usuario ou senha invalida!')
    }
  }
  
  onRegister(): void {
    console.log('Navegando para a página de cadastro...');
    this.router.navigate(['/caminho-para-o-cadastro']); 
  }
}