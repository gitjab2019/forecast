import { Component } from '@angular/core';
import { SeleccionDiaService } from '../../core/seleccionDia/seleccion-dia.service'; 


@Component({
  selector: 'app-cinco-dias',
  templateUrl: './cinco-dias.component.html',
  styleUrls: ['./cinco-dias.component.css']
})
export class CincoDiasComponent {
  constructor(private seleccionDiaService: SeleccionDiaService) {}

  seleccionarDia(dia: number) {
    this.seleccionDiaService.setDiaSeleccionado(dia);
  }
}
