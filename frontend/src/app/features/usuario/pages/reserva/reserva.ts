import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../perfil/services/perfil.service';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.scss'
})
export class ReservaComponent implements OnInit {

  dataEntrada: string = ''; 
  horaEntrada: string = '08:00';
  dataSaida: string = '';
  horaSaida: string = '18:00';
  
  tipoVaga: number = 1; 
  veiculoSelecionadoId: number | null = null;

  usuarioId: number | null = null;
  saldoUsuario: number = 0; 
  meusVeiculos: any[] = [];
  
  valorTotal: number = 0;
  tempoTotalHoras: number = 0;

  constructor(
    private http: HttpClient,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const hoje = new Date();
    this.dataEntrada = hoje.toISOString().split('T')[0];
    this.dataSaida = hoje.toISOString().split('T')[0];

    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    const email = this.perfilService.getEmailDoToken();
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (dados) => {
          this.usuarioId = dados.id;
          
          this.saldoUsuario = dados.saldo || 0;

          this.buscarMeusVeiculos(dados.id);
          this.calcularPreco(); 
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erro usuario", err)
      });
    }
  }

  buscarMeusVeiculos(id: number) {
    this.http.get<any[]>(`http://localhost:8080/api/veiculos/usuario/${id}`)
      .subscribe({
        next: (carros) => {
          this.meusVeiculos = carros || [];
          
          if (this.meusVeiculos.length > 0) {
            this.veiculoSelecionadoId = this.meusVeiculos[0].id;
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erro ao buscar veículos", err)
      });
  }

  criarDataComHora(dataStr: string, horaStr: string): Date {
    if (!dataStr || !horaStr) return new Date();
    const partesData = dataStr.split('-');
    const partesHora = horaStr.split(':'); 
    
    return new Date(
      parseInt(partesData[0]),
      parseInt(partesData[1]) - 1, 
      parseInt(partesData[2]),
      parseInt(partesHora[0]),
      parseInt(partesHora[1])
    );
  }

  calcularPreco() {
    if (!this.dataEntrada || !this.dataSaida) return;

    const inicio = this.criarDataComHora(this.dataEntrada, this.horaEntrada);
    const fim = this.criarDataComHora(this.dataSaida, this.horaSaida);

    if (fim <= inicio) {
        this.valorTotal = 0;
        this.tempoTotalHoras = 0;
        return;
    }

    let diffMs = fim.getTime() - inicio.getTime();
    let horas = Math.ceil(diffMs / (1000 * 60 * 60));
    if (horas < 1) horas = 1;
    
    this.tempoTotalHoras = horas;
    const precoHora = this.tipoVaga === 1 ? 5.00 : 8.00;
    this.valorTotal = horas * precoHora;
  }

  solicitarReserva() {
   
    if (!this.usuarioId || !this.veiculoSelecionadoId) {
      alert("Selecione um veículo!");
      return;
    }

    const agora = new Date();
    const dataInicioReserva = this.criarDataComHora(this.dataEntrada, this.horaEntrada);
    const dataFimReserva = this.criarDataComHora(this.dataSaida, this.horaSaida);

    if (dataInicioReserva.getTime() < (agora.getTime() - 60000)) {
        alert("⚠️ A data/hora de entrada não pode ser no passado. Escolha um horário futuro.");
        return;
    }

    if (dataFimReserva <= dataInicioReserva) {
        alert("⚠️ A data de saída deve ser maior que a data de entrada.");
        return;
    }

    if (this.valorTotal > this.saldoUsuario) {
        alert(`⚠️ Saldo insuficiente!\nVocê tem: R$ ${this.saldoUsuario.toFixed(2)}\nNecessário: R$ ${this.valorTotal.toFixed(2)}\n\nVá em 'Adicionar Saldo' na Home.`);
        return;
    }

    const reservaJSON = {
      dataEntrada: `${this.dataEntrada}T${this.horaEntrada}:00`,
      dataSaida: `${this.dataSaida}T${this.horaSaida}:00`,
      valorTotal: this.valorTotal,
      usuario: { id: this.usuarioId },
      veiculo: { id: this.veiculoSelecionadoId },
      vaga: { id: this.tipoVaga } 
    };

    console.log("Enviando Reserva:", reservaJSON);

    this.http.post('http://localhost:8080/api/reservas', reservaJSON)
      .subscribe({
        next: (res) => {
          alert("Reserva realizada com sucesso!");
          this.router.navigate(['/usuario/temporizador']); 
        },
        error: (err) => {
          console.error(err);
          if (err.error && err.error.message) {
             alert("Erro: " + err.error.message);
          } else {
             alert("Erro ao reservar. Verifique se há vagas disponíveis.");
          }
        }
      });
  }
}