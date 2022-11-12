import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import baseUrl from './helper';
import { UserService } from './user.service';
import { Task } from '../models/task';
import { throwError as obsevableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  public getBoardByProjectAndSprint(idProject:number, idSprint:number): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/ticket/project/${idProject}/sprint/${idSprint}`, authOption);
  }

  public saveTask(request:Task): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.post<Response>(`${baseUrl}/backend/v1/ticket/task`, request, authOption);
  }

  public getTaskById(id:number): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.get<Response>(`${baseUrl}/backend/v1/ticket/task/${id}`, authOption);
  }

  public updateTask(id:number, request:Task): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.put<Response>(`${baseUrl}/backend/v1/ticket/task/${id}`, request, authOption);
  }

  public saveTicket(request:Ticket): Observable<Response> {
    const authOption = this.userService.getAuthenticatedHeader();
    return this.httpClient.post<Response>(`${baseUrl}/backend/v1/ticket`, request, authOption);
  }
}
