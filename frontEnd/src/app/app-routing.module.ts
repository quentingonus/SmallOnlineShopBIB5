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
//import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
//import { ResetComponent } from './pages/reset/reset.component';

const routes: Routes = [
  { path: 'categories', component: AllCategoriesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/detail', component: ProductDetailsComponent },
  { path: 'admin/edit-product', component: EditProductComponent },
  { path: 'admin/add-product', component: AddProductComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactUsComponent },
  //{ path: 'forget', component: ForgetpasswordComponent },
  //{ path: 'reset', component: ResetComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
