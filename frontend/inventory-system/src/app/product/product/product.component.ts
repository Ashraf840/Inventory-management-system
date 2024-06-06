import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MeasurementUnitService } from '../../services/measurementt-unit.service';
import { SupplierService } from '../../services/supplier.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: any | undefined;
  
  categories: any;

  suppliers: any;

  measurementUnits: any;

  createProductForm!: FormGroup;
  
  constructor (
    private productService: ProductService,
    private categoryService: CategoryService,
    private measurementService: MeasurementUnitService,
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.productService.getList(). subscribe(data => {
      this.products = data;
      console.log(this.products);
    });

    this.categoryService.getList().subscribe(data => {
      this.categories = data;
    });

    this.supplierService.getList().subscribe(data => {
      this.suppliers = data;
    });

    this.measurementService.getList().subscribe(data => {
      this.measurementUnits = data;
    });

    this.initCreateProductForm();
  }

  initCreateProductForm(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormControl(),
      supplier: new FormControl(),
      cost_price: new FormControl(null, Validators.required),
      selling_price: new FormControl(null, Validators.required),
      minimum_stock: new FormControl(null, Validators.required),
      measurement_unit: new FormControl(),
      reorder_stock_quantity: new FormControl(null, Validators.required),
    });
  }

  update_product(id: number | undefined) {
    this.router.navigate(['product/update', id]);
  }

  handle_add_prod() {

    this.createProductForm.value.category = parseInt(this.createProductForm.value.category);
    this.createProductForm.value.supplier = parseInt(this.createProductForm.value.supplier);
    this.createProductForm.value.measurement_unit = parseInt(this.createProductForm.value.measurement_unit);

    this.productService.add(this.createProductForm.value).subscribe(data => {
      let modal_close = document.querySelector("#modal_close") as HTMLElement;
      if (modal_close) {
        modal_close.click();
      }
      this.ngOnInit();
    });
  }

  delete_product(id: number) {
    this.productService.delete(id).subscribe(data => {
      this.ngOnInit();
    })
  }
}
