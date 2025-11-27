import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; 
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
  
  isEdicao: boolean = false;
  idUsuario: number | null = null;
  idVeiculo: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      senha: [''],
      
      placa: ['', [Validators.required, Validators.minLength(7)]],
      modelo: ['', [Validators.required]],
      cor: ['', [Validators.required]]
    });

    const idUrl = this.route.snapshot.paramMap.get('id');
    
    if (idUrl) {
      this.isEdicao = true;
      this.idUsuario = Number(idUrl);
      this.carregarDadosParaEdicao(this.idUsuario);
    } else {
      
      this.cadastroForm.get('senha')?.addValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  carregarDadosParaEdicao(id: number) {
    
    this.cadastroService.buscarUsuarioPorId(id).subscribe({
      next: (user) => {
        this.cadastroForm.patchValue({
          nome: user.nome,
          email: user.email,
          telefone: user.telefone
         
        });

        
        this.cadastroService.buscarVeiculoPorUsuario(id).subscribe({
          next: (veiculos) => {
            if (veiculos && veiculos.length > 0) {
              const carro = veiculos[0]; 
              this.idVeiculo = carro.id;
              
              this.cadastroForm.patchValue({
                placa: carro.placa,
                modelo: carro.modelo,
                cor: carro.cor
              });
            }
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao carregar usuário.");
        this.router.navigate(['/admin/usuarios']);
      }
    });
  }

  salvar(): void {
    if (this.isEdicao) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  atualizar() {
    if (this.cadastroForm.invalid) {
      
        if (!this.cadastroForm.value.senha) {
            this.cadastroForm.get('senha')?.setErrors(null);
        }
        
        if (this.cadastroForm.invalid) { 
            this.cadastroForm.markAllAsTouched();
            alert('Verifique os campos.');
            return;
        }
    }

    const dadosUsuario = {
      nome: this.cadastroForm.value.nome,
      email: this.cadastroForm.value.email,
      telefone: this.cadastroForm.value.telefone,
      ...(this.cadastroForm.value.senha ? { senha: this.cadastroForm.value.senha } : {})
    };

    this.cadastroService.atualizarUsuario(this.idUsuario!, dadosUsuario).subscribe({
      next: () => {
        
        if (this.idVeiculo) {
          const dadosVeiculo = {
            placa: this.cadastroForm.value.placa,
            modelo: this.cadastroForm.value.modelo,
            cor: this.cadastroForm.value.cor,
            usuario: { id: this.idUsuario }
          };

          this.cadastroService.atualizarVeiculo(this.idVeiculo, dadosVeiculo).subscribe({
            next: () => {
              alert('Dados atualizados com sucesso!');
              this.router.navigate(['/admin/usuario']);
            }
          });
        } else {
          alert('Usuário atualizado com sucesso!');
          this.router.navigate(['/admin/usuario']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar.');
      }
    });
  }

  cadastrar(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      alert('Preencha todos os campos obrigatórios.');
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
          usuario: { id: usuarioCriado.id }
        };

        this.cadastroService.cadastrarVeiculo(veiculoParaSalvar).subscribe({
          next: () => {
            alert('Cadastro realizado!');
            this.router.navigate(['/admin/usuario']); 
          },
          error: () => alert('Usuário criado, mas erro ao salvar veículo.')
        });
      },
      error: () => alert('Erro ao cadastrar usuário.')
    });
  }
}