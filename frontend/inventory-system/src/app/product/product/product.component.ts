import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MeasurementUnitService } from '../../services/measurementt-unit.service';
import { SupplierService } from '../../services/supplier.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: any | undefined;
  
  categories: any;

  suppliers: any;

  measurementUnits: any;
  
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
      // console.log("category:", this.categories);
    });

    this.supplierService.getList().subscribe(data => {
      this.suppliers = data;
      // console.log("supplier:", this.suppliers);
    });

    this.measurementService.getList().subscribe(data => {
      this.measurementUnits = data;
      // console.log("measurement units:", this.measurementUnits);
    });
  }

  update_product(id: number | undefined) {
    this.router.navigate(['product/update', id]);
  }

  formData = {
    name: "",
    category: "",
    supplier_name: "",
    cost_price: 0,
    selling_price: 0,
    minimum_stock: 0,
    measurement_unit: "",
    reorder_stock_quantity: 0
  };
  
  onCategoryChange(event: Event): void {
    this.formData.category = (event.target as HTMLSelectElement).value;
  }

  onSupplierChange(event: Event): void {
    this.formData.supplier_name = (event.target as HTMLSelectElement).value;
  }

  onMeasurementUnitChange(event: Event): void {
    this.formData.measurement_unit = (event.target as HTMLSelectElement).value;
  }

  add_prod() {
    let new_data = {
      name: this.formData.name,
      category: parseInt(this.formData.category),
      supplier: parseInt(this.formData.supplier_name),
      cost_price: this.formData.cost_price,
      selling_price: this.formData.selling_price,
      minimum_stock: this.formData.minimum_stock,
      measurement_unit: parseInt(this.formData.measurement_unit),
      reorder_stock_quantity: this.formData.reorder_stock_quantity
    }

    this.productService.add(new_data).subscribe(data => {
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
