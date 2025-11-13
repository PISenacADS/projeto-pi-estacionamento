
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { Usuario, UsuarioService } from './services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public isLoading: boolean = true; 

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.carregarUsuarios();
  }

  public carregarUsuarios(): void {
    this.usuarioService.listarTodos().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.isLoading = false; 
        
        this.cdr.markForCheck(); 
      },
      error: (err) => {
        console.error("Erro ao carregar usuários:", err);
        this.isLoading = false; 
        this.usuarios = []; 
        
        this.cdr.markForCheck(); 
      }
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