import { Component, OnInit } from '@angular/core';
import { City } from '../../interfaces/City';
import { CitiesService } from '../../services/cities/cities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  public cities: Array<City>= [];
  constructor(private citiesService:CitiesService, private  route:Router) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(
      cities=>{
        console.log(cities,'cities');
        this.cities=cities;
      })
  }
}
