import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateralUsuarioComponent } from '../../../shared/components/side-bar-usuario/side-bar-usuario';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, MenuLateralUsuarioComponent],
  templateUrl: 'usuario-layout.component.html',
  styleUrl: 'usuario-layout.component.scss'
})
export class UsuarioLayoutComponent {

} 
