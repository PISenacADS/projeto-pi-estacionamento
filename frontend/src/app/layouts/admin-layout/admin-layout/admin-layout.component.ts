import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from '../../../shared/components/side-bar-admin/side-bar';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, MenuLateralComponent],
  templateUrl: 'admin-layout.component.html',
  styleUrl: 'admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
