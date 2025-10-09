import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from './services/usuario.service'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule,RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})


export class UsuarioComponent implements OnInit {

  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  public carregarUsuarios(): void {
    this.usuarioService.listarTodos().subscribe(dados => {
      this.usuarios = dados;
    });
  }

  public deletarUsuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deletar(id).subscribe(() => {
        this.carregarUsuarios();
        alert('Usuário excluído com sucesso!');
      });
    }
  }
}