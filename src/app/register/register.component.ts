import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  users: any[] = [];

  constructor(private router:Router,private userService:UserService) {
    const storedUsers = localStorage.getItem('userList');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  // register() {
  //   const newUser = {
  //     // userid: this.users.length+1,
  //     username: this.username,
  //     password: this.password,
  //     // registeredAt: new Date().toISOString(),
  //     // active: true
  //   };

  //   this.userService.register(newUser).subscribe(data=>{console.log(data)})
  //   // this.users.push(newUser);
  //   // localStorage.setItem('userList', JSON.stringify(this.users));
    
  //   // Clear form
  //   this.username = '';
  //   this.password = '';
  //   Swal.fire({
  //     title: 'Registration Successful',
  //     text: 'Thanks for using this platform',
  //     icon: 'success',
  //     confirmButtonText: 'Ok'
  //   })
  //   this.router.navigateByUrl("login")
  // }

  register() {
    const newUser = {
      userid: this.users.length+1,
      username: this.username,
      password: this.password,
      registeredAt: new Date().toISOString(),
      active: true,
      address: []
    };
    this.users.push(newUser);
    localStorage.setItem('userList', JSON.stringify(this.users));
    
    // Clear form
    this.username = '';
    this.password = '';
    Swal.fire({
      title: 'Registration Successful',
      text: 'Thanks for using this platform',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    this.router.navigateByUrl("login")
  }
}

