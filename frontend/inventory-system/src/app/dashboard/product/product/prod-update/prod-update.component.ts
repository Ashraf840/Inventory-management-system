import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { MeasurementUnitService } from '../../../../services/measurementt-unit.service';
import { SupplierService } from '../../../../services/supplier.service';

@Component({
  selector: 'app-prod-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './prod-update.component.html',
  styleUrl: './prod-update.component.css'
})
export class ProdUpdateComponent implements OnInit {

  id!: number;

  product: any;

  categories: any;

  suppliers: any;
  
  measurementUnits: any;

  updateProductForm!: FormGroup;

  product_category!: string;

  prod_cate_id!: number;

  prod_supp_id!: number;

  prod_m_unit_id!: number;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private categoryService: CategoryService,
    private measurementService: MeasurementUnitService,
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initUpdateProductForm();

    this.id = parseInt(this.route.snapshot.params['id']);

    this.productService.retrieve(this.id).subscribe(data => {
      this.product = data[0];

      console.log("product:", this.product);

      this.categoryService.getList().subscribe(data => {
        this.categories = data;
        this.categories.map((cate: any) => {
          if (cate?.category === this.product?.category)
            this.prod_cate_id=cate?.id;
        })
      });

      this.supplierService.getList().subscribe(data => {
        this.suppliers = data;
        this.suppliers.map((supp: any) => {
          if (supp?.name === this.product?.supplier_name)
            this.prod_supp_id = supp?.id;
        });
      });

      this.measurementService.getList().subscribe(data => {
        this.measurementUnits = data;
        this.measurementUnits.map((m_unit: any) => {
          if (m_unit?.measurement_unit === this.product?.measurement_unit)
            this.prod_m_unit_id = m_unit?.id;
            this.productFormPatchValue(this.product?.id, this.prod_cate_id, this.prod_supp_id, this.prod_m_unit_id);
        });
      });
    });
  }

  initUpdateProductForm(): void {
    this.updateProductForm = new FormGroup({
      id: new FormControl(null, Validators.required),
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

  productFormPatchValue(prod_id: number, cate_id: number, supp_id: number, m_unit_id: number) {
    this.updateProductForm.patchValue({
      id: prod_id,
      name: this.product?.name,
      category: cate_id,
      supplier: supp_id,
      cost_price: this.product?.cost_price,
      selling_price: this.product?.selling_price,
      minimum_stock: this.product?.minimum_stock,
      measurement_unit: m_unit_id,
      reorder_stock_quantity: this.product?.reorder_stock_quantity
    });
  }

  handle_updated_product() {
    this.productService.update(this.updateProductForm.value).subscribe(data => {
      this.router.navigate(['dashboard/product']);
    });
  }
}
