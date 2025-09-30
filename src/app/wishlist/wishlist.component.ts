import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  cartItems: any[] = []
  cart:any[] = []
  loggedIn!:boolean;
  constructor(private dataService: DataService,private router:Router) {}

  ngOnInit(): void {
    this.dataService.currentWishlist.subscribe(data => {
      this.cartItems = data;
    });

    this.dataService.currentCart.subscribe(data => {
      this.cart = data;
    });
  }
  removeFromCart(id:any):void{
    this.cartItems = this.cartItems.filter(item=> item.id!=id)
    this.dataService.setWishlistItems(this.cartItems)
  }
  
  addWishlistToCart(id:any){
    const product = this.cartItems.find(item=>item.id==id);
    const isInCart = this.cart.find(item=>item.id==id);
    if(isInCart!=null && isInCart!=undefined){
      this.cart.map(item=>{
        if(item.id==id){
          item.quantity =item.quantity+1;
        }
      })
    }
    else{
      this.cart.push(product)
    }
    
    this.dataService.setCartItems(this.cart);
    this.cartItems = this.cartItems.filter(item=> item.id!=id)
    this.dataService.setWishlistItems(this.cartItems)
    this.router.navigateByUrl("/cart")
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
