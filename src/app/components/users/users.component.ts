import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/Users';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: Array<User>= [];
  constructor(private usersService:UsersService, private  route:Router) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      users=>{
        console.log(users,'users');
        this.users=users;
      })
  }

}
