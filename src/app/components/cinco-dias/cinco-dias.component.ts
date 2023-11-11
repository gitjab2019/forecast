import { Component } from '@angular/core';
import { SeleccionDiaService } from '../../core/seleccionDia/seleccion-dia.service'; 
import { DailyForecast } from 'src/app/core/Interfaces';
import { PronosticoService } from '../../core/forecast-service/pronostico.service';

@Component({
  selector: 'app-cinco-dias',
  templateUrl: './cinco-dias.component.html',
  styleUrls: ['./cinco-dias.component.css']
})
export class CincoDiasComponent {
  fechas: string[] = [];
  pronostico: DailyForecast[] = [];


  constructor(public datoPronostico: PronosticoService,private seleccionDiaService: SeleccionDiaService) {
    this.inicializarFechas();
  }

  inicializarFechas() {
    const hoy = new Date();

    for (let i = 0; i < 5; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      this.fechas.push(fecha.toDateString()); 
    }
  }

  seleccionarDia(dia: number) {
    this.seleccionDiaService.setDiaSeleccionado(dia);
  }

  ngOnInit() {
    this.datoPronostico.get5dias().subscribe((data: any) => {
      this.pronostico = data.DailyForecasts;
    });  
  }
}
