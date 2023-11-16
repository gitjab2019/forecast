import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/Models';
import { AuthService } from '../../../../core/services/authServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginImage = "assets/images/forecastAi.png";
  
  private email: string = '';

  public user: User = new User({
    "id":null
  });


  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  isValidFiled(field: string): boolean | null {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return "Required field";
        case 'minlength':
          return `Minimun ${errors['minlength'].requiredLength} characters.`;
      }
    }

    return null;
  }


  async onSubmit() {

    if (this.loginForm.valid) {
      console.log('Valid form. User: ', this.loginForm.value.email);
    } else {
      console.log('Invalid form');
    }

    try {
      let isLogin: boolean = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

      if (isLogin) {
        this.router.navigate(["/main"]);
      }
      else {
        this.email = this.loginForm.value.email;
        this.loginForm.reset({ email: this.email });
      }
    } catch (error) {
      console.log(error);
    }
  }

  onRegister() {
    this.router.navigate(["/auth/register"]);
  }
}
