import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Veiculo, VeiculoService } from './services/veiculo.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-automovel',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './automovel.component.html',
  styleUrl: './automovel.component.scss'
})
export class AutomovelComponent implements OnInit {

  public veiculos: Veiculo[] = [];
  public isLoading: boolean = true;

  constructor(
    private veiculoService: VeiculoService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  public carregarVeiculos(): void {
    this.isLoading = true;
    this.veiculoService.listarVeiculos().subscribe({
      next: (dados) => {
        this.veiculos = dados;
        this.isLoading = false;
        this.cdr.markForCheck(); 
      },
      error: (err) => {
        console.error("Erro ao carregar veículos:", err);
        this.isLoading = false;
        this.veiculos = [];
        this.cdr.markForCheck(); 
      }
    });
  }

  public alternarSituacao(veiculo: Veiculo): void {
    if (!veiculo.id) return;

    const acao = veiculo.situacao ? 'desativar' : 'ativar';

    if (confirm(`Deseja realmente ${acao} este veículo?`)) {
      this.veiculoService.trocarSituacao(veiculo.id).subscribe({
        next: (veiculoAtualizado) => {
          const index = this.veiculos.findIndex(v => v.id === veiculoAtualizado.id);
          if (index !== -1) {
            this.veiculos[index] = veiculoAtualizado;
            this.cdr.markForCheck(); 
          }
          alert(`Veículo ${acao === 'ativar' ? 'ativado' : 'desativado'} com sucesso!`);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao alterar situação do veículo.');
        }
      });
    }
  }
}