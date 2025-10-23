import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

interface Veiculo {
  placa: string;
  tempo: string;
  dataHora: string;
  autorizacao: string;
  localidade: string;
}

@Component({
  selector: 'app-temporizador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temporizador.html',
  styleUrls: ['./temporizador.scss']
})
export class TemporizadorComponent implements OnInit {

  public tempoExibido: string = "00:00";
  public textoAte: string = "Até --:--";
  public textoBotao: string = "PROLONGAR +";

  public detalhesVeiculo!: Veiculo;

  constructor() { }

  ngOnInit(): void {
    this.tempoExibido = "13:11";
    this.textoAte = "Até 14:00";

    this.detalhesVeiculo = {
      placa: 'CRM - 5678',
      tempo: '1h',
      dataHora: '31/08/2025 às 13:00',
      autorizacao: 'BDFFG134SGRT',
      localidade: 'SP (São Paulo)'
    };
  }

  prolongarTempo(): void {
    alert('Ação "PROLONGAR +" acionada!');
    this.textoBotao = 'Tempo Estendido!';
  }
}