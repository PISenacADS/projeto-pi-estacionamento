import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/pages/dashboard/dashboard.component';
import { UsuarioComponent } from './features/admin/pages/usuario/usuario.component';
import { FinanceiroComponent } from './features/admin/pages/financeiro/financeiro.component';
import { AutomovelComponent } from './features/admin/pages/automovel/automovel.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';
import { CadastroComponent } from './features/admin/pages/cadastro/cadastro.component';

export const routes: Routes = [
    {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'financeiro', component: FinanceiroComponent },
      { path: 'automovel', component: AutomovelComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/dashboard' }

];
