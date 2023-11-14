import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/authServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user: User = new User({ id: null });

  constructor(private authService: AuthService, private router: Router) {}

  isAdminUser(): boolean {
    if(localStorage.getItem("token") === "admin@gmail.com") {
      return true;
    }
    return false;
  }

  goToUserManagment() {
    this.router.navigate(["/userManagment"]);
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.router.navigate(["/auth/login"]);
    localStorage.clear();
  }

}
