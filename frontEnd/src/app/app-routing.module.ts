import { ProfileComponent } from './pages/profile/profile.component';
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
import { AboutComponent } from './pages/about/about.component';
import AuthGuard from "./guards/auth.guard";
import { LogoutComponent } from './pages/logout/logout.component';
import { FaqComponent } from './pages/faq/faq.component';
import { OrderandshippingComponent } from './pages/orderandshipping/orderandshipping.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { RefundsComponent } from './pages/refunds/refunds.component';
import { PrivacyAndPolicyComponent } from './pages/privacy-and-policy/privacy-and-policy.component';
import { PromotionComponent } from './pages/promotion/promotion.component';

const routes: Routes = [
  { path: 'categories', component: AllCategoriesComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'products/detail', component: ProductDetailsComponent },
  { path: 'admin/order/detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'admin/order', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit-product', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'admin/add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-id/profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'forget', component: ForgetpasswordComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'order-and-shipping', component: OrderandshippingComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'refund', component: RefundsComponent },
  { path: 'privacy-and-policy', component: PrivacyAndPolicyComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
