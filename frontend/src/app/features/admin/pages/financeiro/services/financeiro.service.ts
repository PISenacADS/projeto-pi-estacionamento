import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

// Interface para os dados dos cards
export interface ResumoFinanceiro {
  receitaHoje: number;
  receitaSemanal: number;
  receitaMensal: number;
  pagamentosPendentes: number;
}

// Interface para a tabela de transações (baseada no Pagamento.java)
export interface Pagamento {
  id: number;
  placaVeiculo: string;
  valor: number;
  formaPagamento: string;
  status: string;
  dataPagamento: string; // O backend envia LocalDateTime, que o Angular lê como string
}

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  private apiUrl = 'http://localhost:8080/api/financeiro';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Função segura para SSR que pega o token
  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token'); 
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  // 1. Chama o endpoint GET /api/financeiro/resumo
  getResumo(): Observable<ResumoFinanceiro> {
    // Esta rota é protegida, então enviamos os headers
    return this.http.get<ResumoFinanceiro>(`${this.apiUrl}/resumo`, { headers: this.getAuthHeaders() });
  }

  // 2. Chama o endpoint GET /api/financeiro/pagamentos
  getPagamentos(): Observable<Pagamento[]> {
    // Esta rota também é protegida
    return this.http.get<Pagamento[]>(`${this.apiUrl}/pagamentos`, { headers: this.getAuthHeaders() });
  }
}