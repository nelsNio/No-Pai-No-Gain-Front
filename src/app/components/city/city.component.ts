import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CitiesService } from '../../services/cities/cities.service';
import { CityModels } from '../../models/city.model';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: CityModels = new CityModels();


  constructor(private cityService:CitiesService,private router:Router) { }

  ngOnInit(): void {
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

    peticion = this.cityService.registerCity( this.city );
    peticion.subscribe( resp => {
      
      Swal.fire(
         this.city.name,
         'Se creó correctamente',
         'success'
      );
      this.router.navigateByUrl('/home/cities');

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
