import { Injectable } from '@angular/core';
import { UsuarioModels } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { Global } from '../../models/global/global';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/Users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private  url=Global.api_url;


  constructor(private  http: HttpClient) { }


  registerClient(usuario:UsuarioModels) : Observable<any> {

    return this.http.post<any>(`${this.url}users/`, usuario, { observe: 'response' });
  }

  getUsers():Observable<User[]>{
    return this.http.get<User>(this.url+"users", { observe: 'response' })
    .pipe(
      map((response: any) =>{
        let users = response.body;
        return users;
      })
    )
  }
}
