import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { DashboardDetailComponent } from './dashboard/dashboard-detail/dashboard-detail.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { ProductComponent } from './dashboard/product/product/product.component';
import { ProdUpdateComponent } from './dashboard/product/product/prod-update/prod-update.component';
import { MeasurementUnitComponent } from './dashboard/product/measurement-unit/measurement-unit.component';
import { MuUpdateComponent } from './dashboard/product/measurement-unit/mu-update/mu-update.component';
import { CategoryComponent } from './dashboard/product/category/category.component';
import { CateUpdateComponent } from './dashboard/product/category/cate-update/cate-update.component';
import { SupplierComponent } from './dashboard/supplier/supplier.component';
import { SuppUpdateComponent } from './dashboard/supplier/supp-update/supp-update.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { 
    path: 'auth', 
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardDetailComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product/update/:id', component: ProdUpdateComponent },
      { path: 'product/measurement-unit', component: MeasurementUnitComponent },
      { path: 'product/measurement-unit/update/:id', component: MuUpdateComponent },
      { path: 'product/category', component: CategoryComponent },
      { path: 'product/category/update/:id', component: CateUpdateComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'supplier/update/:id', component: SuppUpdateComponent },
    ],
  },
  // { path: 'dashboard', component: DashboardLayoutComponent },
  // { path: '', component:DashboardComponent },
  // { path: 'product', component:ProductComponent },
  //     { path: 'product/update/:id', component:ProdUpdateComponent },
  // { path: 'product/measurement-unit', component:MeasurementUnitComponent },
  //     { path: 'product/measurement-unit/update/:id', component:MuUpdateComponent },
  // { path: 'product/category', component:CategoryComponent },
  //     { path: 'product/category/update/:id', component:CateUpdateComponent },
  // { path: 'supplier', component:SupplierComponent },
  // { path: 'supplier/update/:id', component:SuppUpdateComponent },
];
