import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Opcional, mas uma boa prática: criar uma interface para o modelo de dados
// Isso ajuda com o autocompletar e a segurança de tipos.
export interface Usuario {
  id?: number; // O ID pode não existir ao criar um novo usuário
  nome: string;
  email: string;
  cpf: string;
  // Adicione outros campos que seu modelo Usuario.java tiver
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // A URL base do seu backend que corresponde ao @RequestMapping("/api/usuarios")
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  // Corresponde ao @GetMapping
  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Corresponde ao @GetMapping("/{id}")
  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Corresponde ao @PostMapping
  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Corresponde ao @PutMapping("/{id}")
  atualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // Corresponde ao @DeleteMapping("/{id}")
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}