import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

export interface Veiculo {
  id?: number;
  placa: string;
  modelo: string;
  cor: string;
  situacao: boolean;
  
  usuario?: any; 
}

@Injectable({
  providedIn: 'root' 
})
export class VeiculoService {

  private apiUrl = 'http://localhost:8080/api/veiculos';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token'); 
      if (token) {
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      }
    }
   
    return new HttpHeaders();
  }

  listarVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  removerVeiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  adicionarVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo, { headers: this.getAuthHeaders() });
  }

   trocarSituacao(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/situacao`, {}, { headers: this.getAuthHeaders() });
  }

}