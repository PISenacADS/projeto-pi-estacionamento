import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [  CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class PerfilComponent {

  balance: number = 25.00;

  user = {
    nome: "Fulano",
    sobrenome: "Silva",
    email: "Fulano@gmail.com",
    telefone: "(11) 9374-23654"
  };

  vehicles = [
    {
      placa: "ABC - 1234",
      modelo: "Chevrolet Onix",
      imagem: "assets/images/carro-amarelo.png",
      ativo: true
    },
    {
      placa: "XYZ - 9876",
      modelo: "Honda Fit",
      imagem: "assets/images/carro-amarelo.png",
      ativo: false
    }
  ];

  constructor() { }
  
}