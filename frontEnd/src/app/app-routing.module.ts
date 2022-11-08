import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { ResetComponent } from './pages/reset/reset.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';

const routes: Routes = [
  { path: 'categories', component: AllCategoriesComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/detail', component: ProductDetailsComponent },
  { path: 'admin/order/detail/:id', component: OrderDetailComponent },
  { path: 'admin/order', component: OrdersComponent },
  { path: 'admin/edit-product', component: EditProductComponent },
  { path: 'admin/add-product', component: AddProductComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'forget', component: ForgetpasswordComponent },
  { path: 'reset', component: ResetComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
