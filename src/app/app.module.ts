import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { ShopComponent } from './shop/shop.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeleteDeviceComponent } from './delete-device/delete-device.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { WishlistComponent } from './wishlist/wishlist.component';

Chart.register(...registerables);



@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ShopComponent,
    AddDeviceComponent,
    DeleteDeviceComponent,
    LoginComponent,
    CartComponent,
    AddressComponent,
    OrdersComponent,
    OrderItemComponent,
    DashboardComponent,
    FeedbackComponent,
    RegisterComponent,
    UserComponent,
    LanguageSwitcherComponent,
    WishlistComponent
  ],
  
imports: [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  BrowserAnimationsModule,
  NgChartsModule,
  CommonModule,
  TranslateModule.forRoot(),
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  })
  ],
  providers: [
    ...provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json'
    })

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
