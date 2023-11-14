import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/Models';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {

  @Input() inputUsers: Array<User> = []
  @Output() userToDelete: EventEmitter<number> = new EventEmitter();
  @Output() userToEdit: EventEmitter<User> = new EventEmitter();


  public deleteUser(id: number){
    this.userToDelete.emit(id);
  }

  public editUser(person: User){
    this.userToEdit.emit(person);
  }

}
