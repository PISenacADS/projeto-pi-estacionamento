import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrlUsuario = 'http://localhost:8080/api/usuarios';
  private apiUrlVeiculo = 'http://localhost:8080/api/veiculos';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrlUsuario, usuario);
  }

  cadastrarVeiculo(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrlVeiculo, veiculo);
  }

  buscarUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsuario}/${id}`);
  }

  buscarVeiculoPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlVeiculo}/usuario/${usuarioId}`);
  }

  atualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlUsuario}/${id}`, usuario);
  }

  atualizarVeiculo(id: number, veiculo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlVeiculo}/${id}`, veiculo);
  }
}