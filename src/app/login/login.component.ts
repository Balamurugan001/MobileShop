import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  redirectUrl:any = null || undefined
  userList!:any[];

  constructor(private dataService:DataService, private router:Router,private route:ActivatedRoute,private userService:UserService){
    this.redirectUrl = this.route.snapshot.queryParamMap.get("redirect")
  }

  
  handleSubmit(form: any) {
    const email = form.controls.email.value;
    const password = form.controls.password.value;
  
    
    if(email === 'admin' && password ==="1234"){
      this.dataService.setData(true);
      this.dataService.setAuth("admin");
      const orders = localStorage.getItem("orders")
      if(orders!=null){
        this.dataService.setOrderItem(JSON.parse(orders))
      }
      else{
        this.dataService.setOrderItem([])
      }
      this.router.navigateByUrl("/admin");

    }
    // else{
    //   // const users = localStorage.getItem("userList") || "[]";
    //   // this.userList = JSON.parse(users)
    //   // const login = this.userList.find(item=> item.username == email && item.password == password)
    //   const user = {
    //     "username":email,
    //     "password":password
    //   }
    //   this.userService.signIn(user).subscribe(data=>{
    //     const login =data;
    //     console.log(login)
      
    //   if(login!=null && login!=undefined){
    //    if(login.active){ this.dataService.setData(true);
    //     this.dataService.setAuth("user");
    //     const orders = localStorage.getItem("orders")
    //     if(orders!=null){
    //       this.dataService.setOrderItem(JSON.parse(orders))
    //     }
    //     else{
    //       this.dataService.setOrderItem([])
    //     }
    //     this.router.navigateByUrl(this.redirectUrl);
    //   }
    //   else{
    //     Swal.fire({
    //       title: 'Account is banned',
    //       text: 'Admin Disabled your account',
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     })
    //   }
    // }
    //   else{
    //     Swal.fire({
    //       title: 'Invalid Credentials',
    //       text: 'Your credentials doesn\'t match',
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     })
    //   }
    //   })
      
    // }

    else{
      const users = localStorage.getItem("userList") || "[]";
      this.userList = JSON.parse(users)
      const login = this.userList.find(item=> item.username == email && item.password == password)
      
      if(login!=null && login!=undefined){
       if(login.active){ this.dataService.setData(true);
        this.dataService.setAuth("user");
        const orders = localStorage.getItem("orders")
        if(orders!=null){
          this.dataService.setOrderItem(JSON.parse(orders))
        }
        else{
          this.dataService.setOrderItem([])
        }
        this.router.navigateByUrl(this.redirectUrl);
      }
      else{
        Swal.fire({
          title: 'Account is banned',
          text: 'Admin Disabled your account',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
      else{
        Swal.fire({
          title: 'Invalid Credentials',
          text: 'Your credentials doesn\'t match',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      
      
    }
    
  }

  goToRegister(){
    this.router.navigateByUrl("register")
  }
  
}
