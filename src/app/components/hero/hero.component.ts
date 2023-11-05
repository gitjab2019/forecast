import { Component, OnInit } from '@angular/core';
import { PronosticoService } from '../../core/forecast-service/pronostico.service';
import { DailyForecast } from '../../core/Interfaces';
import { SeleccionDiaService } from '../../core/seleccionDia/seleccion-dia.service'; 

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit { 
  primerDia: DailyForecast | undefined;
  pronostico: DailyForecast[] = [];
  diaSeleccionado: number = 0;
  fondoImagen: string ='url(src/images/electricStorm.jpg)';
 
  
  constructor(public datoPronostico: PronosticoService, private seleccionDiaService: SeleccionDiaService) {
   console.log(this.fondoImagen);
  }

  ngOnInit() { 
    this.seleccionDiaService.diaSeleccionado$.subscribe((dia) => {
      this.diaSeleccionado = dia;
      //this.actualizarFondo();
      
    });

    this.datoPronostico.get5dias().subscribe((data: any) => {
      console.log(data.DailyForecasts);
      console.log(data);
      this.pronostico = data.DailyForecasts;
      //this.actualizarFondo();
    });
    
  }
/*
  private actualizarFondo() {
    if (this.pronostico[this.diaSeleccionado].Day.IconPhrase === 'Partly cloudy') {
      this.fondoImagen = 'src\images\electricStorm.jpg';
      console.log("ENTRO A LA IMAGEN");
    } else {
      this.fondoImagen = 'url(src/images/electricStorm.jpg)';
      console.log(this.fondoImagen);
    } 
  }*/
}
