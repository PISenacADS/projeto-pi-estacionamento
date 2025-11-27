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

  opcoesCores = [
    { valor: 'black', nome: 'Preto' },
    { valor: 'white', nome: 'Branco' },
    { valor: 'red', nome: 'Vermelho' },
    { valor: 'gray', nome: 'Cinza' },
    { valor: 'silver', nome: 'Prata' },
    { valor: 'yellow', nome: 'Amarelo' },
    { valor: 'blue', nome: 'Azul' }
  ];

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
          
          this.buscarReservasComoMovimentacoes(dados.id);
          
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
          this.listaVeiculos = carros;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Erro ao buscar veículos", err);
          this.cdr.detectChanges();
        }
      });
  }

  buscarReservasComoMovimentacoes(usuarioId: number) {
    this.http.get<any[]>(`http://localhost:8080/api/reservas/usuario/${usuarioId}`)
      .subscribe({
        next: (reservas) => {
          console.log("Reservas encontradas:", reservas);
          
          this.listaMovimentacoes = reservas.map(r => {
            const dataSaida = new Date(r.dataSaida);
            const agora = new Date();
            const estaAtiva = dataSaida > agora; 

            return {
              placa: r.veiculo ? r.veiculo.placa : '---',
              entrada: r.dataEntrada,
              saida: r.dataSaida,
              valor: r.valorTotal,
              ativa: estaAtiva
            };
          });

          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error("Erro ao buscar reservas", err);
          this.listaMovimentacoes = []; 
          this.cdr.detectChanges();
        }
      });
  }

  obterNomeCor(corIngles: string): string {
    const corEncontrada = this.opcoesCores.find(c => c.valor === corIngles);
    return corEncontrada ? corEncontrada.nome : corIngles; 
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