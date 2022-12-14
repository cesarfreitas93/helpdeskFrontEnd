import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Response } from '../models/response';
import baseUrl from './helper';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  public getProjects(): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/project/all`, authOption);
  }

  public saveProject(request:Project): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.post<Response>(`${baseUrl}/backend/v1/project`, request, authOption);
  }
}
