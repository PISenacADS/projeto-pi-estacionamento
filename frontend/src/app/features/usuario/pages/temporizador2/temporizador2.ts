import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-temporizador2',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './temporizador2.html',
  styleUrls: ['./temporizador2.scss']
})
export class Temporizador2Component implements OnInit {

  public tempoExibido: string = "00:00";
  public textoBotao: string = "PROLONGAR +";
  public mensagemStatus: string = "RESERVADO COM SUCESSO!!!";

  constructor() { }

  ngOnInit(): void {

    this.tempoExibido = "03:17";
  }

  prolongarTempo(): void {
    alert('Ação "PROLONGAR +" acionada! O tempo seria estendido agora.');

    this.textoBotao = 'Tempo estendido!';
  }
}