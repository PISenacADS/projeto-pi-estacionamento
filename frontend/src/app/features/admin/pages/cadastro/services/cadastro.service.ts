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
}