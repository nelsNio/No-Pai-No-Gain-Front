import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { SedeModel } from '../../models/sede.model';

import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { SedesService } from '../../services/sedes.service';
import { CitiesService } from '../../services/cities/cities.service';
import { City } from '../../interfaces/City';


@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  sede: SedeModel = new SedeModel();

  public cities: Array<City>= [];

  constructor( private sedeService: SedesService,
    private cityService:CitiesService,
    private route: ActivatedRoute,private router:Router ) { }

  ngOnInit() {

    this.cityService.getCities().subscribe(
      cities=>{
        console.log(cities,'cities');
        this.cities=cities;
      })
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      Swal.fire(
        'Espere!',
        'Error de información',
        'error',
     );
     
      return;
    }

    Swal.fire(
       'Espere!',
       'Guardando información',
       'success',
    );
    Swal.showLoading();
    Swal.close();

    let peticion: Observable<any>;

    peticion = this.sedeService.createSede( this.sede );
    peticion.subscribe( resp => {
      
      Swal.fire(
         this.sede.name,
         'Se creó correctamente',
         'success'
      );
      this.router.navigateByUrl('/home/sedes');

    }, (error) => {
      console.log(error.error.mensaje);
      Swal.fire(
        'Error de registro!',
        error.error.mensaje,
        'error'
      )


      }
    );



  }

}
