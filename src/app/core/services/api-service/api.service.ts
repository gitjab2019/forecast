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
          // Verifica si el usuario ya existe por el email
          const isUserExists = users.some(user => user.email === createUser.email);
  
          if (isUserExists) {
            // Puedes manejar el error aquí o simplemente devolver un observable con un error
            alert('The ussers with the mail' + createUser.email + ' already');
            return throwError('The ussers with the mail' + createUser.email + ' already');
          }
  
          // Si el usuario no existe, continúa con la solicitud HTTP para agregarlo
          const url = `${this.baseURL}/users`;
          return this.http.post<boolean>(url, createUser);
        }),
        catchError(error => {
          // Manejar errores de la solicitud HTTP aquí si es necesario
          console.error('Error al agregar usuario', error);
          return throwError(error);
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

    editUser(id: number, updateUser: User): Observable<boolean> {
      const url = `${this.baseURL}/users/${id}`;
      return this.http.put<boolean>(url, updateUser);
    }
    
}
