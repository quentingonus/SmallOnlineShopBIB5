import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminDashboardComponent, NgbdSortableHeader } from './pages/admin-dashboard/admin-dashboard.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { ResetComponent } from './pages/reset/reset.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ItemCardComponent,
    AllCategoriesComponent,
    ProductDetailsComponent,
    SignupComponent,
    AdminDashboardComponent,
    AddProductComponent,
    EditProductComponent,
    ContactUsComponent,
    NgbdSortableHeader,
    ForgetpasswordComponent,
    ResetComponent,
    CheckOutComponent,
    OrdersComponent,
    OrderDetailComponent,
    CategoryDetailComponent,
    AboutComponent
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SlickCarouselModule,
    HttpClientModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
