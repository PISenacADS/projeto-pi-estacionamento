import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarPadrao } from '../../../shared/components/side-bar-padrao/side-bar-padrao';

@Component({
  selector: 'app-padrao-layout',
  standalone: true,
  imports: [RouterModule, SideBarPadrao],
  templateUrl: './padrao-layout.html',
  styleUrl: './padrao-layout.scss'
})
export class PadraoLayout {

}
