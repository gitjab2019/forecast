import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api-service/api.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  public users: User[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchUsers();
  }

  public searchUsers() {
    this.apiService.getUsers().subscribe(
      (data: User[]) => {
          this.users = data;
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    )
  }

  public deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: ()=>{
        this.searchUsers();
        alert("Usuario eliminado con exito");
      },
      error: ()=> alert("No se ha podido eliminar el usuario")
    })
  }

  public editUser(user: User) {

    const dialogRef = this.dialog.open(EditUserComponent, { data: user, height: '400px', width: '350px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El cuadro de diálogo se cerró con resultado:', result);
    });
  }

  public createUser(user: User) {
    this.apiService.addUser(user).subscribe({
      next: () => {
        this.searchUsers();
        alert("Usuario creado con exito");
      },
      error: () => alert("No se pudo crear el usuario")
    })
  } 

}


