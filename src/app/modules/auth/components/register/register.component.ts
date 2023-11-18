import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api-service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public user: User = new User({ id: null });

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  public userForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.userForm.valid) {
        this.user.email = this.userForm.value.email;
        this.user.password = this.userForm.value.password;
        if(this.user.email != null && this.user.password != null) {
          this.addUser(this.user);
          this.userForm.reset();
        } else {
          alert('Complete both fields')
        }
    } else {
      console.log('Not valid');
    }
  }

  addUser(user: User) {
    this.apiService.addUser(user).subscribe({
      next: () => {
        console.log("Register complete");
        alert('Successful register')
      },
      error: () => console.log("Wrong register")
    })
  }

  goToLogin() {
    this.router.navigate(["/auth/login"]);
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get password() {
    return this.userForm.get('password')!;
  }

}
