import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PronosticoService {
  UrlWeather='http://dataservice.accuweather.com/forecasts/v1/daily/5day/7893';
  apiKeyWeather='kbhHOno4wTgPxy4H8ILT5TPFHQ3VXMSY';
  apiUrl =`${this.UrlWeather}?apikey=${this.apiKeyWeather}`;

  constructor(private http:HttpClient) { 
    console.log('Servicio Works');
  }
  get5dias(){
    let heads=new HttpHeaders()
    heads.append('Access-Control-Allow-Origin', '*');
    heads.append('Content-Type', 'application/json');
    heads.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');          
    return this.http.get(this.apiUrl, {headers:heads});          
  }
}
