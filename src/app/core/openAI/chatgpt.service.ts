import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatGptService {
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  private apiKey = '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'; // Reemplaza con tu clave API

  constructor(private http: HttpClient) {}

  sendPrompt(prompt: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.apiKey}`)
      .set('Content-Type', 'application/json');

    const data = {
      prompt: prompt,
      max_tokens: 50, 
    };

    return this.http.post(this.apiUrl, data, { headers });
  }
}
