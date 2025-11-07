import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { RouterModule } from '@angular/router';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-financeiro',
  imports: [CommonModule,RouterModule, BaseChartDirective],
  standalone: true,
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.scss'
})

export class FinanceiroComponent {
  public isBrowser: boolean;

  public lineChartData: ChartConfiguration['data'] = {
    labels: [
      'Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Últimos 7 dias'
    ],
    datasets: [
      {
        data: [ 5000, 6000, 5500, 7000, 6500, 7200, 7500 ], // Seus dados do backend virão aqui
        label: 'Receita',
        fill: true,
        tension: 0.4, // Deixa a linha curvada
        borderColor: '#5b3e94', // Cor da linha
        backgroundColor: 'rgba(91, 62, 148, 0.2)' // Cor do preenchimento
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartType: ChartType = 'line';

  // ===================================
  // GRÁFICO 2: Formas de Pagamento (Pizza/Rosca)
  // ===================================
  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: [ 'Pix', 'Cartão' ],
    datasets: [
      {
        data: [ 47, 53 ], // Seus dados (47% e 53% - soma dos outros dois)
        backgroundColor: [
          '#f0a441', // Cor do Pix (Laranja)
          '#a06ce0'  // Cor do Cartão (Roxo)
        ],
        hoverBackgroundColor: ['#f0a441', '#a06ce0'],
        borderWidth: 0,
      }
    ]
  };
  public pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%' // Controla o "buraco" no meio para ser uma Rosca
  };
  public pieChartType: 'doughnut' = 'doughnut';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // 5. Defina a variável
    Chart.register(...registerables);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
