import { Component, OnInit } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import baseUrl from 'src/app/services/helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username" : '',
    "password" : ''
  }

  hide = true;
  
  constructor(
    private router:Router,
    private http:HttpClient,
    private snack:MatSnackBar,
    private loginService:LoginService) { }

  ngOnInit(): void {

    

  }

  formSubmit() {
    if (this.loginData.username.trim() == ''|| this.loginData.username.trim() == null) {
      this.snack.open('Ingrese su nombre de usuario', 'Ok', {
        duration: 3000
      })
      return;
    }

    if (this.loginData.password.trim() == ''|| this.loginData.password.trim() == null) {
      this.snack.open('Ingrese su contraseña', 'Ok', {
        duration: 3000
      })
      return;
    }

    this.loginService.getToken(this.loginData).subscribe((data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.setUser(data);
        console.log(this.loginService.getUserRole());

        if (this.loginService.isMasterRol(this.loginService.getUserRole())) {
          this.router.navigate(['main']);
        } else {
          this.loginService.logout();
        }

      }, (error) => {
        console.log(error);
      });
    }
}
