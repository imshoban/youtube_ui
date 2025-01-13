import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLoginSession(username:string, userId:string ,token:string, picture_url:string){
    localStorage.setItem('username',username);
    localStorage.setItem('userId',userId);
    localStorage.setItem('token',token);
    localStorage.setItem('picture_url',picture_url)
  }

}
