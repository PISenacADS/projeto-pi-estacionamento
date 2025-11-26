import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PerfilService } from '../perfil/services/perfil.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

  usuarioNome: string = 'Carregando...';
  
  listaMovimentacoes: any[] | null = null;
  listaVeiculos: any[] | null = null;
  saldoUsuario: number = 0;

  constructor(
    private http: HttpClient,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    const email = this.perfilService.getEmailDoToken();
    
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (dados) => {
          console.log("Dados do Usuário:", dados);
          
          this.usuarioNome = dados.nome;
          this.saldoUsuario = dados.saldo || 0;

          this.buscarMeusVeiculos(dados.id);

          this.buscarMovimentacoes(dados.id);
          
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar usuário', err);
          this.usuarioNome = 'Visitante';
          this.cdr.detectChanges();
        }
      });
    }
  }

  buscarMeusVeiculos(usuarioId: number) {
    this.http.get<any[]>(`http://localhost:8080/api/veiculos/usuario/${usuarioId}`)
      .subscribe({
        next: (carros) => {
          this.listaVeiculos = carros;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar veículos', err);
          this.listaVeiculos = [];
          this.cdr.detectChanges();
        }
      });
  }

  buscarMovimentacoes(usuarioId: number) {
    this.http.get<any[]>(`http://localhost:8080/api/movimentacoes/usuario/${usuarioId}`)
      .subscribe({
        next: (dados) => {
          this.listaMovimentacoes = dados;
          this.cdr.detectChanges(); 
        },
        error: () => {
          this.listaMovimentacoes = []; 
          this.cdr.detectChanges();
        }
      });
  }
}