import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, registerables, ChartType } from 'chart.js';
import { DashboardService } from './Services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isBrowser: boolean;
  
  public vagasOcupadas: number = 0;
  public vagasTotal: number = 150;
  public ocupacaoPercentual: number = 0;
  public receitaHoje: number = 0;
  public ultimosPagamentos: any[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: [], 
      label: 'Receita',
      borderColor: '#fff',
      backgroundColor: 'rgba(91, 62, 148, 0.1)',
      borderWidth: 2,
      tension: 0.4, 
      pointRadius: 0, 
    }]
  };
  
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { display: false }, y: { display: false } }, 
    plugins: { legend: { display: false } }
  };
  public lineChartType: 'line' = 'line';

  public barChartData: ChartData<'bar'> = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [{
      data: [], 
      backgroundColor: '#5b3e94',
      borderRadius: 4,
      barThickness: 12,
    }]
  };
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      x: { grid: { display: false }, ticks: { color: '#888' } },
      y: { display: false } 
    },
    plugins: { legend: { display: false } }
  };
  public barChartType: 'bar' = 'bar';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.carregarDados();
    }
  }

  carregarDados() {
    this.dashboardService.getDadosDashboard().subscribe({
      next: (dados) => {
        
        this.vagasOcupadas = dados.vagasOcupadas;
        this.vagasTotal = dados.vagasTotal;
        this.ocupacaoPercentual = (this.vagasOcupadas / this.vagasTotal) * 100;

        this.receitaHoje = dados.receitaHoje;

        this.lineChartData.datasets[0].data = dados.graficoReceita;
        this.lineChartData.datasets[0].borderColor = '#5b3e94';
        this.lineChartData = { ...this.lineChartData }; 

        this.barChartData.datasets[0].data = dados.graficoSemanal;
        this.barChartData = { ...this.barChartData }; 

        this.ultimosPagamentos = dados.ultimosPagamentos;

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar dashboard', err)
    });
  }
}