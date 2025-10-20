import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class CadastroComponente implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      lembrar: [false]
    }, {
      validator: this.senhasCoincidem
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      alert('ERRO: Por favor, verifique os campos do formulário.');
      this.cadastroForm.markAllAsTouched();
      return;
    }

    console.log('✅ Cadastro realizado com sucesso! Dados:');
    
    const dadosDoFormulario = this.cadastroForm.value;
    delete dadosDoFormulario.confirmarSenha;

    console.log(dadosDoFormulario);
    alert('✅ Cadastro realizado com sucesso!');
    
    this.cadastroForm.reset(); 
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