import { Injectable } from '@angular/core';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://localhost:3000";
  private user?: User;

  constructor(private apiService: ApiService) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public login(email: string, password: string): Promise<User> {

    return new Promise<User>((resolve, reject) => {

      this.apiService.getToAuth(email, password)
        .subscribe(
          {
            next: user => resolve(user[0]),
            error: error => reject(error)
          }
        )

    })


  }
}
