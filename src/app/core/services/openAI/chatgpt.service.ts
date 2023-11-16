import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  apiKeyFirstPart = 'sk-kZF0PpZjoWwqsfo3lFb';
  apiKeySecondPart = 'AT3BlbkFJjBZevpZgeYo4i3ZYVPuP';

  //IMPORTANTE!!! --> EN AUTHRIZATION SE DEBE CONCATENAR O INCLUIR EN UN SOLO STRING apiKeyFirstPart y apiKeySecondPart
  header = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "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"
  })

  constructor(
    private http: HttpClient
  ) { }

  gptTest(prompt: string) {
    return this.http.post('https://api.openai.com/v1/completions', {"model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 2048}, {headers: this.header});
  }
}
