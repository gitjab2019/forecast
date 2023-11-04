import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/api-service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  //userForm!: FormGroup;

  public user: User = new User({ id: null });

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

 /* ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  } */

  public userForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  ngOnInit(): void {
  }

  onSubmit() {
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      if(this.user.email != null && this.user.password != null) {
        this.addUser(this.user);
      }
  }

  addUser(user: User) {
    this.apiService.addUser(user).subscribe({
      next: () => {
        alert("Register complete");
      },
      error: () => alert("Wrond register")
    })
  }



}
