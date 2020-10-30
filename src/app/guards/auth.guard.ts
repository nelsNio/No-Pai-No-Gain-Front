import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private  auth:AuthService, private  router:Router) {
  }
  canActivate():boolean  {

    if (this.auth.isAutenticated()){
      return true;
    }else {

     this.router.navigateByUrl('/login');
     return  false;
    }
  }


}

export class AdminGuard implements CanActivate{
  constructor(private  auth:AuthService, private  router:Router) {
  }
  canActivate():boolean  {
    
    if (this.auth.isAdmin()){
      return true;
    }else {

     this.router.navigateByUrl('/sedes');
     return  false;
    }
  }


}

