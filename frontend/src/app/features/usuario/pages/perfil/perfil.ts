import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from './services/perfil.service';
import { AutomovelRoutingModule } from "../../../admin/pages/automovel/automovel-routing.module";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, AutomovelRoutingModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  veiculos: any[] = [];
  isLoading = true;

  constructor(private perfilService: PerfilService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const email = this.perfilService.getEmailDoToken();
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (user) => {
          this.usuario = user;
          this.perfilService.getVeiculosUsuario(user.id).subscribe(carros => {
            this.veiculos = carros;
            this.isLoading = false;
            this.cdr.markForCheck();
          });
        },
        error: () => this.isLoading = false
      });
    }
  }
}