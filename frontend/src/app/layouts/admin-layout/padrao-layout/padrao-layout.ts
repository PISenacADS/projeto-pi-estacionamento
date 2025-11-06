import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from "../../../shared/components/side-bar-admin/side-bar";

@Component({
  selector: 'app-padrao-layout',
  standalone: true,
  imports: [RouterModule, MenuLateralComponent],
  templateUrl: './padrao-layout.html',
  styleUrl: './padrao-layout.scss'
})
export class PadraoLayout {

}
