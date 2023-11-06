import { Component } from '@angular/core';
import { ChatGptService } from '../../core/openAI/chatgpt.service';

@Component({
  selector: 'app-chat',
  templateUrl: './a-side.component.html',
})
export class ChatComponent {
  constructor(private chatGptService: ChatGptService) {}

  enviarPrompt() {
    const prompt = 'Escribe tu pregunta o mensaje aquí...';
    this.chatGptService.sendPrompt(prompt).subscribe((response) => {
      console.log('Respuesta de ChatGPT:', response.choices[0].text);
    });
  }
}
