import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';

import { ViewUsersComponent } from './components/users/view-users/view-users.component';
import { UserManagmentComponent } from './components/users/user-managment/user-managment.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AddUserComponent,
    ViewUsersComponent,
    UserManagmentComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
