import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { MeasurementUnitService } from '../../../services/measurementt-unit.service';
import { NgFor } from '@angular/common';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-prod-update',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './prod-update.component.html',
  styleUrl: './prod-update.component.css'
})
export class ProdUpdateComponent implements OnInit {

  id!: number;

  product: any;

  categories: any;

  suppliers: any;
  
  measurementUnits: any;

  selectedCategoryId: number | null = null;
  
  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private categoryService: CategoryService,
    private measurementService: MeasurementUnitService,
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);

    this.productService.retrieve(this.id).subscribe(data => {
      this.product = data[0];

      // console.log("product:", this.product);

      this.formData.name = this.product?.name;
      this.formData.category = this.product?.category;
      this.formData.supplier_name = this.product?.supplier_name;
      this.formData.cost_price = this.product?.cost_price;
      this.formData.selling_price = this.product?.selling_price;
      this.formData.minimum_stock = this.product?.minimum_stock;
      this.formData.measurement_unit = this.product?.measurement_unit;
      this.formData.reorder_stock_quantity = this.product?.reorder_stock_quantity;

      // console.log("form data:", this.formData);

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
    });
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
    console.log('Selected category ID:', this.formData.category);
  }

  onSupplierChange(event: Event): void {
    this.formData.supplier_name = (event.target as HTMLSelectElement).value;
    console.log('Selected supplier ID:', this.formData.supplier_name);
  }

  onMeasurementUnitChange(event: Event): void {
    this.formData.measurement_unit = (event.target as HTMLSelectElement).value;
    console.log('Selected measurement unit ID:', this.formData.measurement_unit);
  }

  updated_product() {
    console.log(this.formData);
    let updated_data = {
      id: this.id,
      name: this.formData.name,
      category: parseInt(this.formData.category),
      supplier: parseInt(this.formData.supplier_name),
      cost_price: this.formData.cost_price,
      selling_price: this.formData.selling_price,
      minimum_stock: this.formData.minimum_stock,
      measurement_unit: parseInt(this.formData.measurement_unit),
      reorder_stock_quantity: this.formData.reorder_stock_quantity
    }

    // console.log("updated_data:", updated_data);

    this.productService.update(updated_data).subscribe(data => {
      this.router.navigate(['/product']);
    });
  }
}
