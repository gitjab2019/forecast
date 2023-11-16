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
        console.error('Error during users obtain', error);
      }
    )
  }

  public deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: ()=>{
        this.searchUsers();
        alert("User deleted");
      },
      error: ()=> alert("Cant delete user")
    })
  }

  public editUser(user: User) {

    const dialogRef = this.dialog.open(EditUserComponent, { data: user, height: '400px', width: '350px' });
    console.log(user.email + 'asdasds')
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog box closed:', result);
    });
  }

  public createUser(user: User) {
    this.apiService.addUser(user).subscribe({
      next: () => {
        this.searchUsers();
        console.log("User created");
      },
      error: () => console.log("Cant create user")
    })
  } 

}


