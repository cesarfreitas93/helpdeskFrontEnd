import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import baseUrl from './helper';
import { PersonReqDto } from '../models/personReq';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  public getPersons() : Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/person/all`, authOption);
  }

  public saveProject(request:PersonReqDto): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.post<Response>(`${baseUrl}/backend/v1/person`, request, authOption);
  }
}
