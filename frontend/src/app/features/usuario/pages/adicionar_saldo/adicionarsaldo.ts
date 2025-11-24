import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../perfil/services/perfil.service';

@Component({
  selector: 'app-adicionar-saldo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './adicionar_saldo.html',
  styleUrls: ['./adicionar_saldo.scss']
})
export class AdicionarSaldoComponent implements OnInit {

  valorSelecionado: number = 0;
  metodoPagamento: string = 'pix';
  usuarioId: number | null = null;
  processando: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private perfilService: PerfilService
  ) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    const email = this.perfilService.getEmailDoToken();
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (dados) => this.usuarioId = dados.id,
        error: (err) => console.error(err)
      });
    }
  }

  selecionarValor(valor: number) {
    this.valorSelecionado = valor;
  }

  confirmarPagamento() {
    if (!this.usuarioId) {
      alert("Erro: Usuário não identificado.");
      return;
    }
    if (this.valorSelecionado <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    this.processando = true;

    setTimeout(() => {
      
      const payload = {
        usuarioId: this.usuarioId,
        valor: this.valorSelecionado
      };

      this.http.post('http://localhost:8080/api/pagamentos/adicionar', payload)
        .subscribe({
          next: () => {
            alert(`Pagamento de R$ ${this.valorSelecionado} confirmado via ${this.metodoPagamento.toUpperCase()}!`);
            this.router.navigate(['/usuario/home']); 
          },
          error: (err) => {
            console.error(err);
            alert("Erro ao processar pagamento.");
            this.processando = false;
          }
        });

    }, 2000);
  }
}