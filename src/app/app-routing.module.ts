import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard, authGuard } from './core/services/authServices/guards/auth.guard';
import { UserManagmentComponent } from './components/users/user-managment/user-managment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import("./modules/landing/landing.module").then(m => m.MainModule),
    canActivate:[authGuard]
  },
  {
    path: 'userManagment',
    component: UserManagmentComponent,
    canActivate:[adminGuard]
  },
  { 
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full' 
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
