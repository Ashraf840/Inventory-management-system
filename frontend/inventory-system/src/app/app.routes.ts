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
import { unauthGuard } from './guards/unauth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { 
    path: 'auth', 
    component: AuthLayoutComponent,
    canActivate: [unauthGuard],
    children: [
      { path: 'login', canActivate: [unauthGuard], component: LoginComponent },
      { path: 'signup', canActivate: [unauthGuard], component: SignupComponent },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', canActivate: [authGuard], component: DashboardDetailComponent },
      { path: 'product', canActivate: [authGuard], component: ProductComponent },
      { path: 'product/update/:id', canActivate: [authGuard], component: ProdUpdateComponent },
      { path: 'product/measurement-unit', canActivate: [authGuard], component: MeasurementUnitComponent },
      { path: 'product/measurement-unit/update/:id', canActivate: [authGuard], component: MuUpdateComponent },
      { path: 'product/category', canActivate: [authGuard], component: CategoryComponent },
      { path: 'product/category/update/:id', canActivate: [authGuard], component: CateUpdateComponent },
      { path: 'supplier', canActivate: [authGuard], component: SupplierComponent },
      { path: 'supplier/update/:id', canActivate: [authGuard], component: SuppUpdateComponent },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
