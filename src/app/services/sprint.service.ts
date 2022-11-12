import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import baseUrl from './helper';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  public getSprint(): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/sprint/all`, authOption);
  }
}
