import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public getToken(request: any): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(`${baseUrl}/backend/auth/login`, request);
  }

  public loginUser(token: any) {
    localStorage.setItem('gestion-soporte-ti-token', token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('gestion-soporte-ti-token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('gestion-soporte-ti-token');
    localStorage.removeItem('gestion-soporte-ti-user');
    return true;
  }

  public getLocalToken() {
    return localStorage.getItem('gestion-soporte-ti-token');
  }

  public setUser(access:any) {
    localStorage.setItem('gestion-soporte-ti-user', JSON.stringify(access));
  }

  public getUser() {
    let userStr = localStorage.getItem('gestion-soporte-ti-user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout()
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    if (user == undefined || user == null || user == null) {
      return false;
    }
    return user.authorities;
  }

  public isMasterRol(authoritiesJson:any) {

    if (authoritiesJson == undefined || authoritiesJson == null || authoritiesJson == null) {
      return false;
    }

    for (let key in authoritiesJson) {
      if (authoritiesJson[key].authority == 'ROLE_MASTER') {
        return true;
      }
    }
    return false;
  }

  public isAdminRol(authoritiesJson:any) {
    for (let key in authoritiesJson) {
      if (authoritiesJson[key].authority == 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }

  public isSupervisorRol(authoritiesJson:any) {
    for (let key in authoritiesJson) {
      if (authoritiesJson[key].authority == 'ROLE_SUPERVISOR') {
        return true;
      }
    }
    return false;
  }

  public isTechnicalRol(authoritiesJson:any) {
    for (let key in authoritiesJson) {
      if (authoritiesJson[key].authority == 'ROLE_TECHNICAL') {
        return true;
      }
    }
    return false;
  }
}
