import { Component, OnInit } from '@angular/core';
import { PronosticoService } from '../../core/services/forecast-service/pronostico.service';
import { DailyForecast } from '../../core/Interfaces';
import { SeleccionDiaService } from '../../core/services/seleccionDia/seleccion-dia.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers: [DatePipe]
})
export class HeroComponent implements OnInit {
  
  primerDia: DailyForecast | undefined;
  pronostico: DailyForecast[] = [];
  diaSeleccionado: number = 0;
  fondoImagen: string = 'Clear.jpg';
  primeraCarga: boolean = false;


  createDefaultDailyForecast(): DailyForecast {
    return {
      Date: '',
      EpochDate: 0,
      Temperature: {
        Minimum: {
          Value: 0,
          Unit: '',
          UnitType: 0,
        },
        Maximum: {
          Value: 0,
          Unit: '',
          UnitType: 0,
        },
      },
      Day: {
        Icon: 0,
        IconPhrase: '',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 0,
        IconPhrase: '',
        HasPrecipitation: false,
      },
      Sources: [],
      MobileLink: '',
      Link: '',
    };
  }


  constructor(public datoPronostico: PronosticoService, private seleccionDiaService: SeleccionDiaService) {}



  ngOnInit() {
    this.initializePronostico();
    this.datoPronostico.get5dias().subscribe((data: any) => {
      this.pronostico = data.DailyForecasts;
    }).add(() => {
      this.seleccionDiaService.diaSeleccionado$.subscribe((dia) => {

        if (!this.primeraCarga) {
          this.diaSeleccionado = 0;
          this.primeraCarga = true;
          console.log('primera carga');
        } else this.diaSeleccionado = dia;
        const iconPhrase = this.pronostico[this.diaSeleccionado].Day.IconPhrase;
        const cleanIconPhrase = iconPhrase.replace(/\s+/g, '').replace(/\//g, '');

        this.fondoImagen = `${cleanIconPhrase}.jpg`;
        console.log(this.fondoImagen)

        console.log(this.fondoImagen);
        console.log('url(assets/images/' + this.fondoImagen + ')');
      });
    });
  }

  convertirACelcius(temp: number): number {
    return Math.floor(((temp - 32) * 5) / 9);
  }

  initializePronostico(): void {
    this.pronostico = new Array(5).fill(null).map(() => this.createDefaultDailyForecast());
  }

}


