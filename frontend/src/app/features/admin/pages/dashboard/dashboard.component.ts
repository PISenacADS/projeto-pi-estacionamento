import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public isBrowser: boolean;
  public ocupacaoPercentual = (120 / 150) * 100; 

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        data: [300, 350, 400, 380, 500, 550, 580], 
        label: 'Receita',
        borderColor: '#5b3e94', 
        tension: 0.4, 
        pointRadius: 0, 
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      x: { display: false },
      y: { display: false }
    },
    plugins: { 
      legend: { display: false }
    }
  };
  public lineChartType: 'line' = 'line';

  public barChartData: ChartData<'bar'> = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [
      {
        data: [110, 130, 140, 120, 125, 115, 100],
        backgroundColor: '#5b3e94',
        borderRadius: 4,
        barThickness: 12,
      }
    ]
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { color: '#888' }
      },
      y: { 
        display: false 
      }
    },
    plugins: {
      legend: { display: false } 
    }
  };
  public barChartType: 'bar' = 'bar';


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    Chart.register(...registerables);
 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}