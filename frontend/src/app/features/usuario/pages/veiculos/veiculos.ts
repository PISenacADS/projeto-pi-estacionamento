import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PerfilService } from '../perfil/services/perfil.service'; 

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], 
  templateUrl: './veiculos.html',
  styleUrl: './veiculos.scss'
})
export class VeiculosComponent implements OnInit {

  usuarioNome: string = '...';
  listaVeiculos: any[] = [];
  listaMovimentacoes: any[] = [];
  
  listaRelatorios: any[] = []; 

  constructor(
    private http: HttpClient,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDados();
    this.gerarRelatoriosFalsos(); 
  }

  carregarDados() {
    const email = this.perfilService.getEmailDoToken();
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (dados) => {
          this.usuarioNome = dados.nome;
          
          this.buscarMeusVeiculos(dados.id);
          
          this.buscarMovimentacoes(dados.id);
          
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }

  buscarMeusVeiculos(id: number) {
    this.http.get<any[]>(`http://localhost:8080/api/veiculos/usuario/${id}`)
      .subscribe({
        next: (carros) => {
          console.log("Veículos carregados na tela de veículos:", carros);
          this.listaVeiculos = carros;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Erro ao buscar veículos", err);
          this.cdr.detectChanges();
        }
      });
  }

  buscarMovimentacoes(id: number) {
    this.http.get<any[]>(`http://localhost:8080/api/movimentacoes/usuario/${id}`)
      .subscribe({
        next: (dados) => {
          this.listaMovimentacoes = dados;
          this.cdr.detectChanges();
        }
      });
  }

  gerarRelatoriosFalsos() {
    const hoje = new Date();
    
    for (let i = 1; i <= 5; i++) {
      
      const dataPassada = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      
      const ultimoDia = new Date(dataPassada.getFullYear(), dataPassada.getMonth() + 1, 0);
      
      const mes = dataPassada.getMonth() + 1; 
      const mesFormatado = mes < 10 ? `0${mes}` : mes;
      
      this.listaRelatorios.push({
        label: `01/${mesFormatado} até ${ultimoDia.getDate()}/${mesFormatado}`,
        link: '#' 
      });
    }
  }
  
  baixarPDF() {
    alert("Simulando download do PDF...");
  }
}