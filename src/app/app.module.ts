import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DriverDashboardComponent } from './pages/driver-dashboard/driver-dashboard.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { AuthService } from './services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PackageItemComponent } from './components/package-item/package-item.component';
import { DeliveryItemComponent } from './components/delivery-item/delivery-item.component';
import { CustomMapComponent } from './components/custom-map/custom-map.component';
import { SocketService } from './services/socket/socket.service';
import { ItemSearchBarComponent } from './components/item-search-bar/item-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    DriverDashboardComponent,
    CustomerDashboardComponent,
    PageNotFoundComponent,
    CustomButtonComponent,
    PackageItemComponent,
    DeliveryItemComponent,
    CustomMapComponent,
    ItemSearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [AuthService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
