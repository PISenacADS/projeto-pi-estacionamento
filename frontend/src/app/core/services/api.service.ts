import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * 1. CADASTRO
   * Envia o formulário de cadastro para o backend
   * @param usuario (nome, email, telefone, senha)
   */
  registrar(usuario: any): Observable<any> {

    return this.http.post(`${API_URL}/register`, usuario);
  }

  /**
   * 2. LOGIN
   * Envia as credenciais de login para o backend
   * @param credenciais (email, senha)
   */
  login(credenciais: any): Observable<any> {

    return this.http.post(`${API_URL}/login`, credenciais).pipe(
    
      tap((resposta: any) => {
        if (resposta.token) {
          localStorage.setItem('auth_token', resposta.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  public estaLogado(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
}