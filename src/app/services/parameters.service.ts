import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  public getStatus() {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get(`${baseUrl}/backend/v1/parameter/status/all`, authOption);
  }

  public getCategories() {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get(`${baseUrl}/backend/v1/parameter/category/all`, authOption);
  }
}
