import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:3000"

  users: User[] = new Array();

  constructor(private http: HttpClient) { }

    // Users

    public getToAuth(email: string, password: string): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`)
    }

    public addUser(createUser: User): Observable<boolean> {
      return this.getUsers().pipe(
        switchMap(users => {
          // verificamos que el user exista por email
          const isUserExists = users.some(user => user.email === createUser.email);
  
          if (isUserExists) {
            alert('The ussers with the mail ' + createUser.email + ' already exists');
            return throwError(() => new Error('The ussers with the mail ' + createUser.email + ' already exists'));
          }
  
          const url = `${this.baseURL}/users`;
          return this.http.post<boolean>(url, createUser);
        }),
        catchError(error => {
          console.error('Error al agregar usuario', error);
          return throwError(() => error);
        })
      );
    }

    
    public getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseURL}/users`);
    }

    public deleteUser(id: number): Observable<boolean> {
      console.log(id)
      return this.http.delete(`${this.baseURL}/users/${id}`)
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
    }

    public editUser(id: number, updateUser: User): Observable<boolean> {
      const url = `${this.baseURL}/users/${id}`;
      return this.http.put<boolean>(url, updateUser);
    }

    public validateExistingEmail(email: string): Observable<boolean> {
      return this.getUsers().pipe(
        map(users => users.some(user => user.email === email)),
        catchError(error => {
          console.error('Error during email validation', error);
          return throwError(() => error);
        })
      );
    }
    
}
