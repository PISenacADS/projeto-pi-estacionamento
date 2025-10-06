import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateral } from '../../../../shared/components/menu-lateral/menu-lateral';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, MenuLateral],
  templateUrl: 'admin-layout.component.html',
  styleUrl: 'admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
