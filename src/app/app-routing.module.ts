import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard, AdminGuard } from './guards/auth.guard';
import { SedesComponent } from './components/sedes/sedes.component';
import { SedeComponent } from './components/sede/sede.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityComponent } from './components/city/city.component';

const routes: Routes = [
  
  {
    path:'home',
    component:NavbarComponent,
    canActivate:[AuthGuard]

     ,
    children:[

      { path: 'sedes', component: SedesComponent},
      { path: 'sedes/new', component: SedeComponent},
      { path: 'cities/new', component: CityComponent},
      { path: 'users', component: UsersComponent},
      { path: 'cities', component: CitiesComponent},
     ]
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
