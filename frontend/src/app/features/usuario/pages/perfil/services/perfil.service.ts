import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return new HttpHeaders();
  }

  getEmailDoToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          return decoded.sub; 
        } catch (e) { return null; }
      }
    }
    return null;
  }

  getDadosUsuario(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/email?email=${email}`, { headers: this.getAuthHeaders() });
  }

  getVeiculosUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/veiculos/usuario/${id}`, { headers: this.getAuthHeaders() });
  }
}