import { Injectable } from '@angular/core';
import { Global } from '../../models/global/global'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../../interfaces/City';
import { map } from 'rxjs/operators';
import { CityModels } from '../../models/city.model';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private  url=Global.api_url;

  constructor( private  http: HttpClient ) { }

  getCities():Observable<City[]>{
    return this.http.get<City>(this.url+"cities", { observe: 'response' })
    .pipe(
      map((response: any) =>{
        let cities = response.body;
        return cities;
      })
    )
  }

  registerCity(city:CityModels) : Observable<any> {

    return this.http.post<any>(`${this.url}cities/`, city, { observe: 'response' });
  }

  
}
