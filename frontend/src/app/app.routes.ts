import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UsuarioComponent } from './features/admin/usuario/usuario.component';
import { FinanceiroComponent } from './features/admin/financeiro/financeiro.component';
import { AutomovelComponent } from './features/admin/automovel/automovel.component';
import { AdminLayoutComponent } from './core/features/admin/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
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
