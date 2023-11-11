import { Component, OnInit } from '@angular/core';
import { ChatgptService } from '../../core/openAI/chatgpt.service';
import { PronosticoService } from '../../core/forecast-service/pronostico.service';
import { SeleccionDiaService } from '../../core/seleccionDia/seleccion-dia.service';
import { DailyForecast } from 'src/app/core/Interfaces';
import * as OpenAI from 'openai';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './a-side.component.html',
  styleUrls: ['./a-side.component.css'],
  providers: [DatePipe]
})


export class ChatComponent implements OnInit {
  pronostico: DailyForecast[] = [];
  title = 'gptapp';
  resGPT = '';
  prompt = '';
  enviando: boolean = false;
  sugerencias: string[] = [];
  diaSeleccionado: number = 0;

  constructor(private gpt: ChatgptService, private datoPronostico: PronosticoService, private seleccionDiaService: SeleccionDiaService) 
  {}

  configuration = {
    apiKey: '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'
  };

  ngOnInit(): void {
    this.datoPronostico.get5dias().subscribe((data: any) => {
      this.pronostico = data.DailyForecasts;
      this.prompt = this.buildPrompt();
  
      const openai = new OpenAI.OpenAI({ ...this.configuration, dangerouslyAllowBrowser: true });
      openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',//'text-davinci-002',
        prompt: this.prompt,
        max_tokens: 2000,
        temperature: 1.0,
      }).then(response => {
        const models = response.choices[0].text;
        console.log('Prompt:', this.prompt);
        console.log('Available models:', models);
        this.sugerencias = this.parseModels(models);
        
      }).catch(error => {
        console.error('Error listing models:', error);
      });
      
    });

    this.seleccionDiaService.diaSeleccionado$.subscribe((dia: number) => {
      this.diaSeleccionado = dia; 
      });
  }

  

  
  parseModels(models: string): string[] {
    try {
      // Dividir la cadena en un array usando un separador (puedes ajustar el separador según la estructura de tu cadena)
      const modelsArray = models.split('\n');
      
      // Filtrar cualquier cadena vacía o no deseada
      const filteredArray = modelsArray.filter(item => item.trim() !== '');
  
      return filteredArray;
    } catch (error) {
      console.error('Error parsing models:', error);
      return [];
    }
  }
  
  
 

  consultar(argument: string) {
    this.enviando = true;
    this.resGPT = '';
    this.gpt.gptTest(argument).subscribe((res: any) => {
      console.log("res", res);
      this.resGPT = res.choices[0].text;
      this.enviando = false;
    });
  }

  initJsonPronostico() {
    const pronostico_5_dias = [
      { fecha: this.pronostico[0].Date, pronostico: this.pronostico[0].Day.IconPhrase, sugerencias: "" },
      { fecha: this.pronostico[1].Date, pronostico: this.pronostico[1].Day.IconPhrase, sugerencias: "" },
      { fecha: this.pronostico[2].Date, pronostico: this.pronostico[2].Day.IconPhrase, sugerencias: "" },
      { fecha: this.pronostico[3].Date, pronostico: this.pronostico[3].Day.IconPhrase, sugerencias: "" },
      { fecha: this.pronostico[4].Date, pronostico: this.pronostico[4].Day.IconPhrase, sugerencias: "" },
    ];
    const pronosticoJSON = { pronostico_5_dias };
    return pronosticoJSON;
  }

  buildPrompt(): string {
    let prompt = 'En idioma español, según el Pronóstico, dime que puedo hacer cada día en Mar del Plata, Argentina, trata de ser divertido:\n';
  
    for (let i = 0; i < this.pronostico.length; i++) {
      const fecha = this.pronostico[i].Date;
      const pronostico = this.pronostico[i].Day.IconPhrase;
  
     
      prompt += `${i + 1}. Fecha: ${fecha}, Pronóstico: ${pronostico}, Sugerencias:\n`;
    }
  
    return prompt;
  }
}