import { Component } from '@angular/core';
import { PronosticoService } from '../services/pronostico.service';
import { DailyForecast } from '../interfaces/forecast.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  primerDia:DailyForecast | undefined;
  pronostico: DailyForecast[] = [];
 

  constructor(public datoPronostico:PronosticoService)
   {
     this.datoPronostico.get5dias().subscribe((data:any) => {
         console.log(data.DailyForecasts);
         console.log(data);
         this.pronostico=data.DailyForecasts;  
    });
   }
   
}
