import { Routes } from '@angular/router';
import { ProductComponent } from './product/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeasurementUnitComponent } from './product/measurement-unit/measurement-unit.component';
import { CategoryComponent } from './product/category/category.component';
import { MuUpdateComponent } from './product/measurement-unit/mu-update/mu-update.component';
import { CateUpdateComponent } from './product/category/cate-update/cate-update.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SuppUpdateComponent } from './supplier/supp-update/supp-update.component';
import { ProdUpdateComponent } from './product/product/prod-update/prod-update.component';

export const routes: Routes = [
    { path: '', component:DashboardComponent },
    { path: 'product', component:ProductComponent },
        { path: 'product/update/:id', component:ProdUpdateComponent },
    { path: 'product/measurement-unit', component:MeasurementUnitComponent },
        { path: 'product/measurement-unit/update/:id', component:MuUpdateComponent },
    { path: 'product/category', component:CategoryComponent },
        { path: 'product/category/update/:id', component:CateUpdateComponent },
    { path: 'supplier', component:SupplierComponent },
    { path: 'supplier/update/:id', component:SuppUpdateComponent },
];
