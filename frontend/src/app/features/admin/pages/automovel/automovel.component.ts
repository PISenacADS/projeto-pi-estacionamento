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

  public deletarVeiculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.removerVeiculo(id).subscribe(() => {
        alert('Veículo removido com sucesso!');
        this.carregarVeiculos(); 
      });
    }
  }
}