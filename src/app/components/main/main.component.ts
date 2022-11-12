import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router:Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  handleLogout() {
    if (this.loginService.logout()) {
      this.router.navigate(['login']);
    }
  }
  
}
