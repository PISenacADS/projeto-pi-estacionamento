import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

export interface ResumoFinanceiro {
  receitaHoje: number;
  receitaSemanal: number;
  receitaMensal: number;
  pagamentosPendentes: number;
}

export interface Pagamento {
  id: number;
  placaVeiculo: string;
  valor: number;
  formaPagamento: string;
  status: string;
  dataPagamento: string; 
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

  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token'); 
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  getResumo(): Observable<ResumoFinanceiro> {
    
    return this.http.get<ResumoFinanceiro>(`${this.apiUrl}/resumo`, { headers: this.getAuthHeaders() });
  }

  getPagamentos(): Observable<Pagamento[]> {
   
    return this.http.get<Pagamento[]>(`${this.apiUrl}/pagamentos`, { headers: this.getAuthHeaders() });
  }
}