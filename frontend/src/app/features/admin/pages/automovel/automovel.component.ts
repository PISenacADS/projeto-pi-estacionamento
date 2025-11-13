import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Veiculo, VeiculoService } from './services/veiculo.service'; // 1. Importe
import { CommonModule } from '@angular/common'; // 2. Importe
import { RouterModule } from '@angular/router'; // 3. Importe

@Component({
  selector: 'app-automovel',
  standalone: true, // 4. Defina como standalone
  imports: [CommonModule, RouterModule], // 5. Adicione os imports
  templateUrl: './automovel.component.html',
  styleUrl: './automovel.component.scss'
})
export class AutomovelComponent implements OnInit {

  public veiculos: Veiculo[] = [];
  public isLoading: boolean = true;

  constructor(
    private veiculoService: VeiculoService,
    private cdr: ChangeDetectorRef // 6. Injete o ChangeDetectorRef
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
        this.cdr.markForCheck(); // 7. Avise o Angular para atualizar a tela
      },
      error: (err) => {
        console.error("Erro ao carregar veículos:", err);
        this.isLoading = false;
        this.veiculos = [];
        this.cdr.markForCheck(); // Avise mesmo em caso de erro
      }
    });
  }

  public deletarVeiculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.removerVeiculo(id).subscribe(() => {
        alert('Veículo removido com sucesso!');
        this.carregarVeiculos(); // Recarrega a lista
      });
    }
  }
}