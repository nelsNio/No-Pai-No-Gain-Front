import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UsuarioModels } from '../../models/usuario.model';
import Swal from 'sweetalert2'
import {Router} from "@angular/router";
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModels;
  admin = false;
  recordarme = false;

  constructor(private userService:UsersService,private router:Router) { }

  ngOnInit() {
    this.usuario= new UsuarioModels();
  }

  onSubmit(form: NgForm){
    console.log(this.admin,'admin');
    console.log(this.recordarme,'recordarme');
    console.log(form.invalid)
    if (form.invalid){return;}
    Swal.fire(
      'Login job!',
      'Information sender!',
      'success'
    )
    Swal.showLoading();
    if(this.admin == true){
      this.usuario.role='admin';
    }
    this.userService.registerClient(this.usuario)
      .subscribe(resp=>{
       
        if(resp.body.error== false){

          if ( this.recordarme ) {
            localStorage.setItem('email', this.usuario.email);
          }
          Swal.close();
          Swal.fire(
            'Usuario registrado!',
            resp.body.message,
            'success'
          );
          this.router.navigateByUrl('/login');
          
        }else{
          Swal.fire(
            'Register Error!',
            resp.body.mensaje,
            'error'
          );
        }
      }, (error) => {
        Swal.fire(
          'Register Error!',
          error,
          'error'
        )
        })
  
  }

}
