import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  public getStatus() : Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/parameter/status/all`, authOption);
  }

  public getCategories() : Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/parameter/category/all`, authOption);
  }
}
