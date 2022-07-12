import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/employees']);
    }
  }

  async onLogin() {
    if (!this.formGroup.valid) return;

    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;

    let data: HttpResponse<any> = await this.authService.login(username, password)
    const token = data.headers.get('Authorization')?.replace('Bearer ', '')??"";
    localStorage.setItem("token", token);
  }
}