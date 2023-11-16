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

    //! Users

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
        map(resp => true), // Si sale bien retorna true. Recibir un response significa que salio bien
        catchError(error => of(false)) // Si hay algun error en la solicitud me regresa falso
      );
    }

    editUser(id: number, updateUser: User): Observable<boolean | string> {
      console.log(updateUser.email)
      return this.validateExistingEmail(updateUser.email!).pipe(
        switchMap(isValid => {
          if (isValid) {
            const url = `${this.baseURL}/users/${id}`;
            return this.http.put<boolean>(url, updateUser).pipe(
              catchError(error => {
                console.error('Error during user edit', error);
                return throwError(() => error);
              })
            );
          } else {
            return throwError('This email already exists');
          }
        }),
        catchError(error => {
          console.error('Error during email validation', error);
          return throwError(() => error);
        })
      );
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
