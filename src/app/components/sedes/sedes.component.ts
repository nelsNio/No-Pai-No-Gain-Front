import { Component, OnInit } from '@angular/core';
import { SedesService } from '../../services/sedes.service';
import { Sedes } from '../../interfaces/Sedes';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  public sedes: Array<Sedes>= [];
  constructor(private sedesService:SedesService, private  route:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.sedesService.getSedes().subscribe(
      sedes=>{
        console.log(sedes,'sedes');
        this.sedes=sedes;
      })
  }
  salir() {
    this.auth.logout();
    this.route.navigateByUrl('/login');
  }
}
