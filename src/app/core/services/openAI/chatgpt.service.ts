import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  apiKeyFirstPart = 'sk-oEqa0eEPj2zSGeuNPVZBT3';
  apiKeySecondPart = 'BlbkFJ6bA0wG04byn3mASFl9Q9';

  header = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.apiKeyFirstPart + this.apiKeySecondPart
  })

  constructor(
    private http: HttpClient
  ) { }

  gptTest(prompt: string) {
    return this.http.post('https://api.openai.com/v1/completions', {"model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 2048}, {headers: this.header});
  }
}
