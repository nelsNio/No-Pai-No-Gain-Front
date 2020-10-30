import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioModels} from '../models/usuario.model';
import { Observable } from 'rxjs';
import { Global } from '../models/global/global';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private  url=Global.api_url;
  private credentualsAuth={
    
    email: "",
    password: ""
  }
 
    userToken:string;
    userRole:string;

  constructor(private  http: HttpClient) {
    this.loadToken();
  }

  login(usuario:UsuarioModels) : Observable<any> {
    
    this.credentualsAuth.password= usuario.password;
    this.credentualsAuth.email=usuario.email;

    return this.http.post<any>(`${this.url}login`, this.credentualsAuth, { observe: 'response' });
  }

  saveToken(token:String){
    // @ts-ignore
    this.userToken=token;
    localStorage.setItem('token_gim',this.userToken);


  }
  saveRole(role:String){
    // @ts-ignore
    this.userRole=role;
    localStorage.setItem('role_gim',this.userRole);
  }

  loadToken(){
    // @ts-ignore
    if (localStorage.getItem('token_gim')){
      this.userToken=localStorage.getItem('token_gim');
    }
    else {
      this.userToken='';
    }



  }

  isAutenticated():boolean{
    console.log(this.userToken);
    if (this.userToken.length<5){
      return false
    }
    if (this.userToken.toString()=='undefine'){
      return false
    }
    else {
      return true
    }
  }

  isAdmin():boolean{
    if (localStorage.getItem('role_gim')){
      this.userRole=localStorage.getItem('role_gim');
    }
    else {
      this.userRole='';
    }
    console.log(this.userRole);
    return false;
    
  }


  logout(){

    return localStorage.removeItem('token_gim');
  }
}

