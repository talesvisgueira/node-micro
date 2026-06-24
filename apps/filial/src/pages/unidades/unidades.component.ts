import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
 
import { Observable, Subscription } from 'rxjs';
import { UnidadeService } from '@/src/services/UnidadeService';



@Component({
  selector: 'app-unidades',
  imports: [],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.scss'
})


export class UnidadesComponent {

  protected readonly listaUnidades = signal<Unidade[]>([]);
  private readonly http = inject(HttpClient);
  private sub?: Subscription;
  private readonly service: UnidadeService = inject(UnidadeService);

  ngOnInit() {

    this.listarUnidades();
  }

  listarUnidades(): void {

    this.sub = this.service.listarUnidades().subscribe(data => {
      this.listaUnidades.set(data)
    });

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  editar(unidade: Unidade) {
    alert('Editar');
  }

  deletar(id: number) {
    alert('Deletar ' + id);
    this.listarUnidades();
  }

}
