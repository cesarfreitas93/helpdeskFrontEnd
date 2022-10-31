import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helpdesk-system-front-end';

  constructor(
    private router:Router,
    private loginService: LoginService) {}

  public showMenu():boolean{

    if (this.loginService.isMasterRol(this.loginService.getUserRole())) {
      return true;
    } else {
      return false;
    }

  }

}
