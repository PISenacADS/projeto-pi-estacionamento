import { isPlatformBrowser, CommonModule, CurrencyPipe, DatePipe } from '@angular/common'; // 1. Importe DatePipe
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { RouterModule } from '@angular/router';
import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef, afterNextRender } from '@angular/core'; 

import { FinanceiroService, ResumoFinanceiro, Pagamento } from './services/financeiro.service';

@Component({
  selector: 'app-financeiro',
  // 2. Adicione DatePipe aos imports (para a tabela funcionar)
  imports: [CommonModule, RouterModule, BaseChartDirective, CurrencyPipe, DatePipe], 
  standalone: true,
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.scss'
})
export class FinanceiroComponent implements OnInit {
  
  public isBrowser: boolean;
  public isLoading: boolean = true;

  public resumo: ResumoFinanceiro = {
    receitaHoje: 0,
    receitaSemanal: 0,
    receitaMensal: 0,
    pagamentosPendentes: 0
  };
  
  public transacoes: Pagamento[] = [];

  // --- Gráficos (começam vazios) ---
  public lineChartData: ChartConfiguration['data'] = {
    labels: [], // Começa vazio
    datasets: [{
        data: [], // Começa vazio
        label: 'Receita', fill: true, tension: 0.4,
        borderColor: '#5b3e94', backgroundColor: 'rgba(91, 62, 148, 0.2)'
    }]
  };
  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: [ 'Pix', 'Cartão' ],
    datasets: [{
        data: [0, 0], // Começa [0, 0]
        backgroundColor: ['#f0a441', '#a06ce0'],
        hoverBackgroundColor: ['#f0a441', '#a06ce0'],
        borderWidth: 0,
    }]
  };
  // --- Fim dos Gráficos ---

  public lineChartOptions: ChartConfiguration['options'] = { responsive: true, maintainAspectRatio: false };
  public lineChartType: ChartType = 'line';
  public pieChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, maintainAspectRatio: false, cutout: '60%' };
  public pieChartType: 'doughnut' = 'doughnut';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private financeiroService: FinanceiroService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    afterNextRender(() => {
      this.carregarDados();
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
  }

  carregarDados(): void {
    this.isLoading = true;

    // Busca os dados dos CARDS
    this.financeiroService.getResumo().subscribe({
      next: (dadosResumo) => {
        this.resumo = dadosResumo;
        this.cdr.markForCheck(); 
      },
      error: (err) => console.error('Erro ao carregar resumo', err)
    });

    // Busca os dados da TABELA (e agora dos Gráficos!)
    this.financeiroService.getPagamentos().subscribe({
      next: (todosPagamentos) => {
        // 1. Alimenta a tabela de "Transações"
        this.transacoes = todosPagamentos;
        
        // 2. PROCESSA OS GRÁFICOS (Sua lógica!)
        this.processarGraficoPizza(todosPagamentos);
        this.processarGraficoLinha(todosPagamentos);
        
        this.isLoading = false;
        this.cdr.markForCheck(); // Avisa o Angular para redesenhar tudo
      },
      error: (err) => {
        console.error('Erro ao carregar pagamentos', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * ✅ Processa a lista de pagamentos para o gráfico de Formas de Pagamento.
   */
  processarGraficoPizza(pagamentos: Pagamento[]): void {
    let totalPix = 0;
    let totalCartao = 0;

    // Itera sobre todos os pagamentos e soma os valores
    for (const p of pagamentos) {
      // (Vamos checar 'PAGO' para não contar pagamentos pendentes)
      if (p.status === 'Pago') {
        if (p.formaPagamento === 'PIX') {
          totalPix += p.valor;
        } else if (p.formaPagamento === 'Cartão' || p.formaPagamento === 'CARTAO') {
          totalCartao += p.valor;
        }
      }
    }

    // Atualiza os dados do gráfico de pizza
    this.pieChartData.datasets[0].data = [totalPix, totalCartao];
  }

  /**
   * ✅ Processa a lista de pagamentos para o gráfico de Evolução da Receita
   * (Últimos 7 dias).
   */
  processarGraficoLinha(pagamentos: Pagamento[]): void {
    const labels: string[] = [];
    const data: number[] = [];
    
    const hoje = new Date(); // Data de hoje

    // Loop pelos últimos 7 dias (de 6 dias atrás até hoje)
    for (let i = 6; i >= 0; i--) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() - i);
      dia.setHours(0, 0, 0, 0); // Zera a hora para comparar o dia todo

      // Formata o label (ex: "14/11")
      const label = dia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      labels.push(label);

      // Filtra os pagamentos SÓ desse dia e que estejam "Pagos"
      const pagamentosDoDia = pagamentos.filter(p => {
        const dataPagamento = new Date(p.dataPagamento); // Converte a string do backend
        dataPagamento.setHours(0, 0, 0, 0);
        
        return dataPagamento.getTime() === dia.getTime() && p.status === 'Pago';
      });

      // Soma o valor total desse dia
      const totalDoDia = pagamentosDoDia.reduce((sum, p) => sum + p.valor, 0);
      data.push(totalDoDia);
    }

    // Atualiza os dados do gráfico de linha
    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = data;
  }
}