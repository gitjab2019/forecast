import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/core/Models';
import { ApiService } from '../api-service/api.service';


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

  public async login(email: string, password: string): Promise<boolean> {

    let isLogin = false;

    try {

      let apiResponse = this.apiService.getToAuth(email, password);

      let userRespone = await lastValueFrom(apiResponse);

      this.user = userRespone[0];

      if (this.user) {
        localStorage.setItem('token', this.user.email!);
        isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return isLogin;
  }

  setUser(user: User): void {
    this.user = { ...user }; 
  }

  public checkAuthentication(): boolean{
    return localStorage.getItem('token') ? true : false;
  }

  public isAdminUser(): boolean {
    if(localStorage.getItem('token') === 'admin@gmail.com') {
      return true;
    }
    return false;
  }

}

