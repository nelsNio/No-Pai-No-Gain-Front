import { Injectable } from '@angular/core';
import { Global } from '../models/global/global';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Sedes } from '../interfaces/Sedes';
import { SedeModel } from '../models/sede.model';


@Injectable({
  providedIn: 'root'
})
export class SedesService {
  private  url=Global.api_url;




  constructor( private  http: HttpClient ) { }

  getSedes():Observable<Sedes[]>{
    return this.http.get<Sedes>(this.url+"sedes", { observe: 'response' })
    .pipe(
      map((response: any) =>{
        let products = response.body;
        return products;
      })
    )
  }

  createSede( sede: SedeModel ) {
    
    return this.http.post(`${ this.url }sedes/`, sede)
            .pipe(
              map( (resp: any) => {
                sede.id = resp.data;
                return sede;
              }));

  }
}
