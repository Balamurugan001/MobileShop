import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddressComponent } from './address/address.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteDeviceComponent } from './delete-device/delete-device.component';
import { DeviceComponent } from './device/device.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './login/login.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user/user.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:"",component:ShopComponent},
  {path:"device/:id",component:DeviceComponent,canActivate:[authGuard]},
  {path:"add",component:AddDeviceComponent,canActivate:[authGuard]},
  {path:"delete",component:DeleteDeviceComponent,canActivate:[authGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"cart",component:CartComponent  },
  {path:"address",component:AddressComponent,canActivate:[authGuard]},
  {path:"orders/:id",component:OrdersComponent,canActivate:[authGuard]},
  {path:"order/:id",component:OrderItemComponent,canActivate:[authGuard]},
  {path:"admin",component:DashboardComponent,canActivate:[authGuard]},
  {path:"feedback",component:FeedbackComponent,canActivate:[authGuard]},
  {path:"user",component:UserComponent,canActivate:[authGuard]},
  {path:"wishlist",component:WishlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
