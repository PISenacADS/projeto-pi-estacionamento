import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { PerfilService } from '../perfil/services/perfil.service';

@Component({
  selector: 'app-temporizador',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './temporizador.html',
  styleUrls: ['./temporizador.scss']
})
export class TemporizadorComponent implements OnInit, OnDestroy {

  public tempoExibido: string = "--:--";
  public textoAte: string = "Carregando...";
  public textoBotao: string = "PROLONGAR +";
  
  public dashOffset: number = 0; 
  private totalDash: number = 283;

  public reservaAtiva: any = null;
  private intervaloId: any;

  // Variável para controlar classe CSS de fonte pequena
  public fontePequena: boolean = false; 

  constructor(
    private http: HttpClient,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarReservaDoUsuario();
  }

  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }

  carregarReservaDoUsuario() {
    const email = this.perfilService.getEmailDoToken();
    if (email) {
      this.perfilService.getDadosUsuario(email).subscribe({
        next: (usuario) => {
          this.buscarUltimaReserva(usuario.id);
        },
        error: (err) => console.error("Erro ao buscar usuário", err)
      });
    }
  }

  buscarUltimaReserva(usuarioId: number) {
    this.http.get<any[]>(`http://localhost:8080/api/reservas/usuario/${usuarioId}`)
      .subscribe({
        next: (reservas) => {
          if (reservas && reservas.length > 0) {
            this.reservaAtiva = reservas[0]; 
            this.iniciarContagem();
            this.cdr.detectChanges(); 
          } else {
            alert("Você não possui reservas ativas. Redirecionando...");
            this.router.navigate(['/usuario/reserva']);
          }
        },
        error: (err) => {
          console.error("Erro reservas", err);
          this.cdr.detectChanges(); 
        }
      });
  }

  iniciarContagem() {
    if (!this.reservaAtiva) return;

    if (this.intervaloId) clearInterval(this.intervaloId);

    const dataSaida = new Date(this.reservaAtiva.dataSaida);
    const dataEntrada = new Date(this.reservaAtiva.dataEntrada);
    const totalDuracaoMs = dataSaida.getTime() - dataEntrada.getTime();

    this.textoAte = `Até ${dataSaida.getDate()}/${(dataSaida.getMonth()+1)} às ${dataSaida.getHours().toString().padStart(2, '0')}:${dataSaida.getMinutes().toString().padStart(2, '0')}`;
    
    this.cdr.detectChanges(); 

    this.intervaloId = setInterval(() => {
      const agora = new Date().getTime();
      const fim = dataSaida.getTime();
      const diferenca = fim - agora;

      if (diferenca <= 0) {
        this.tempoExibido = "00:00";
        this.dashOffset = 283;
        this.textoAte = "Tempo Esgotado!";
        clearInterval(this.intervaloId);
      } else {
        
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
        if (dias > 0) {
          
          this.tempoExibido = `${dias}d ${horas}h ${minutos}m`;
          this.fontePequena = true; 
        } else {
          
          this.tempoExibido = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
          this.fontePequena = false;
        }

        const tempoDecorrido = totalDuracaoMs - diferenca;
        const porcentagemConcluida = tempoDecorrido / totalDuracaoMs;
        this.dashOffset = this.totalDash * porcentagemConcluida; 
      }
      
      this.cdr.detectChanges(); 

    }, 1000);
  }

  prolongarTempo(): void {
    if (!this.reservaAtiva) return;

    this.textoBotao = 'Processando...';

    this.http.put(`http://localhost:8080/api/reservas/${this.reservaAtiva.id}/prolongar`, {})
      .subscribe({
        next: (reservaAtualizada: any) => {
          alert('+1 Hora adicionada.');
          this.reservaAtiva = reservaAtualizada;
          this.iniciarContagem();
          this.textoBotao = 'PROLONGAR +';
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao prolongar tempo.');
          this.textoBotao = 'PROLONGAR +';
          this.cdr.detectChanges();
        }
      });
  }
}