import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api-service/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  public user: User = new User({ id: null });

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private fb: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<EditUserComponent>) {}

  public userForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  ngOnInit(): void {
    
    this.user = this.data;
    console.log(this.user)

    this.userForm.patchValue({
      email: this.user.email,
      password: this.user.password
    });
  }

  onSubmit() {
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
    
    if(this.user.email != null && this.user.password != null) {
      this.editUser();
    }
  }
  
  public editUser() {
    this.apiService.editUser(this.user.id!, this.user).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => {
        console.log("Wrong register")
      }
    });
  }

  public closeDialog(){
    this.dialogRef.close(false);
  }

}
