import { Component, OnInit } from '@angular/core';
import {UsuarioModels} from '../../models/usuario.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModels;
  recordarme = false;

  constructor(private  authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.usuario= new UsuarioModels();
  }

  login(form: NgForm){
    if (form.invalid){return;}
    Swal.fire(
      'Login job!',
      'Information sender!',
      'success'
    )
    Swal.showLoading();

    this.authService.login(this.usuario)
      .subscribe(resp=>{
       
        if(resp.body.error== false){

          if ( this.recordarme ) {
            localStorage.setItem('email', this.usuario.email);
          }
          this.router.navigateByUrl('/home/sedes');
          //this.router.navigate(['home/sedes']);
          Swal.close();
          this.authService.saveToken(resp.body.data.token)
          this.authService.saveRole(resp.body.data.usuario.role);
        }else{
          Swal.fire(
            'Credentials Error!',
            resp.body.mensaje,
            'error'
          );
        }
      }, (error) => {
        Swal.fire(
          'Credentials Error!',
          error,
          'error'
        )
        })
  }

}
