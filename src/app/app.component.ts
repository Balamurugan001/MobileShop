import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from './cartItem.model';
import { DataService } from './data.service';
import { MobileService } from './mobile.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  showDropdown: boolean = false;

  title = 'MobileShop';
  isAdmin:boolean = true;
  name:string="";
  updated:any;
  cartItems:any[]=[];
  wishlistItems:any[]=[];
  val!:CartItem;
  auth:string="none"; 

  constructor(private mobile:MobileService,private router:Router, private dataService:DataService,private route:ActivatedRoute){}
  ngOnInit():void{

    this.dataService.currentData.subscribe(data=>{
      this.isAdmin = data
      this.name= data?"Logout":"Login";
    })

    this.dataService.auth.subscribe(data=>this.auth=data)
    

    this.dataService.currentCart.subscribe(data=>{
      this.cartItems = data;
    })

    this.dataService.currentWishlist.subscribe(data=>{
      this.wishlistItems = data;
    })
  }

  toggleControl():void{
    if(!this.isAdmin) this.router.navigate(["login"],{queryParams:{"redirect":""}})
    else{
      this.isAdmin=false;
      this.auth="none"
      this.dataService.setData(false)
      this.router.navigateByUrl("")
    
    }
  }

  goToCart(){
    this.router.navigateByUrl("/cart")
  }

  goToWishlist(){
    this.router.navigateByUrl("/wishlist")
  }


  goToOrders(){
    if(this.isAdmin)  this.router.navigateByUrl("/orders")
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown
    console.log(this.showDropdown)
  }

  goToDevices() {
    this.router.navigateByUrl("delete")
  }
  goToUsers() {
    this.router.navigateByUrl("user")
  }

  goToDashboard(){
    this.router.navigateByUrl("")
  }
  goToHome() {
    this.router.navigateByUrl("admin")
  }
    

}


