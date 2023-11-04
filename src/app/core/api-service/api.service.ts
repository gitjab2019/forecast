import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

    //! Users

    public getToAuth(email: string, password: string): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`)
    }

    public addUser(createUser: User): Observable<boolean> {
      const url = `${this.baseURL}/users`;
      return this.http.post<boolean>(url, createUser);
    }    
}
