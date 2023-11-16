import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, empty } from 'rxjs';
import { User } from 'src/app/core/Models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  userForm: FormGroup;

  user: User = new User({
    "id" : null,
    "email": null,
    "password": null
  });

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  @Output() public userToCreate: EventEmitter<User> = new EventEmitter();

  public createUser() {
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
  
    if (this.user.email && this.user.password) {
      console.log(this.user);
      this.userToCreate.emit(this.user);
    } else {
      alert("Complete both fields");
    }
  }
}
