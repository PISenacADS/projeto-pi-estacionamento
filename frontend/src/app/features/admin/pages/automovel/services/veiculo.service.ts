import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

// Interface que define o formato do Veículo
export interface Veiculo {
  id?: number;
  placa: string;
  modelo: string;
  cor: string;
  situacao: boolean;
  // Alterado para 'usuario' para combinar com o Backend
  usuario?: any; 
}

@Injectable({
  providedIn: 'root' // Permite que este serviço seja usado em QUALQUER lugar (Admin e Usuário)
})
export class VeiculoService {

  // URL base da API de veículos
  private apiUrl = 'http://localhost:8080/api/veiculos';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Função auxiliar para pegar o Token do localStorage de forma segura
  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token'); 
      if (token) {
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      }
    }
    // Retorna headers vazios se não tiver token (o backend vai bloquear com 403 se precisar)
    return new HttpHeaders();
  }

  // 1. Listar Veículos (GET) - Usado na tela Admin
  listarVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // 2. Remover Veículo (DELETE) - Usado na tela Admin
  removerVeiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // 3. Adicionar Veículo (POST) - Usado na tela Cadastro de Veículo (Usuário)
  // ESTE É O MÉTODO QUE ESTAVA FALTANDO PARA O SEU CADASTRO
  adicionarVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo, { headers: this.getAuthHeaders() });
  }

}