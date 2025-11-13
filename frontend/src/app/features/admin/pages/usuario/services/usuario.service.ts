import { HttpClient, HttpHeaders } from '@angular/common/http';
// 1. IMPORTE Inject, PLATFORM_ID
import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; 
// 2. IMPORTE isPlatformBrowser
import { isPlatformBrowser } from '@angular/common'; 
import { Observable, of } from 'rxjs'; // 3. IMPORTE 'of'

// ... (sua interface Usuario)
export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  telefone: string; 
  role?: string;
  senha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  // 4. INJETE O PLATFORM_ID
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthHeaders(): HttpHeaders {
    // 5. FAÇA A VERIFICAÇÃO AQUI
    if (isPlatformBrowser(this.platformId)) {
      // Se estiver no NAVEGADOR, pegue o token
      const token = localStorage.getItem('auth_token'); 
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    // Se estiver no SERVIDOR, retorne headers vazios
    return new HttpHeaders();
  }

  listarTodos(): Observable<Usuario[]> {
    // Esta função agora é "segura" para rodar no servidor.
    // No servidor, ela vai chamar o backend sem token (e vai falhar com 403,
    // mas NÃO VAI CRASHAR o SSR por causa do localStorage).
    return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // O resto do seu service (deletar, etc.) usa getAuthHeaders(),
  // então eles também estão seguros agora.
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}