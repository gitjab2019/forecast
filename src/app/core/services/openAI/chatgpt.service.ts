import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  header = new HttpHeaders({
    "Content-Type": "application/json",
<<<<<<< HEAD:src/app/core/openAI/chatgpt.service.ts
    "Authorization": "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"
=======
    "Authorization": "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"
>>>>>>> f66e5c7886e24d456d290620168743e64e0a4298:src/app/core/services/openAI/chatgpt.service.ts
  })

  constructor(
    private http: HttpClient
  ) { }

  gptTest(prompt: string) {
    return this.http.post('https://api.openai.com/v1/completions', {"model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 2048}, {headers: this.header});
  }
}
