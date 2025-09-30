import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // cartItems: any[] =[{"id":1,"name":"Google Pixel 6 pro", "price":1000, "quantity":1}];
  cartItems: any[] = []
  loggedIn!:boolean;
  constructor(private dataService: DataService,private router:Router) {}

  ngOnInit(): void {
    this.dataService.currentCart.subscribe(data => {
      this.cartItems = data;
    });
  }
  removeFromCart(id:any):void{
    this.cartItems = this.cartItems.filter(item=> item.id!=id)
    this.dataService.setCartItems(this.cartItems)
  }
  increaseQuantity(id:any){
    const product = this.cartItems.find(item=>item.id==id)
    product.quantity = product.quantity+1;
    product.itemprice = product.itemprice + product.price
  }
  decreaseQuantity(id:any){
    const product = this.cartItems.find(item=>item.id==id)
    if(product.quantity==1) this.removeFromCart(id);
    else{ 
      product.quantity = product.quantity-1;
      product.itemprice = product.itemprice+product.price;
    }
  }

  calculateTotal():any{
    return this.cartItems.reduce((total,item)=> total+item.price*item.quantity,0)
  }
  checkout(){
    this.dataService.currentData.subscribe(data=>{
      this.loggedIn=data
    })
    if(!this.loggedIn)  this.router.navigate(["/login"],{queryParams:{"redirect":"/cart"}})
      else { 
        this.router.navigateByUrl("/address")
      }
  }
}
