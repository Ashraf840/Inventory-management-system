import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from '../../interface/supplier/supplier';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  suppliers!: Supplier[];

  createSupplierForm!: FormGroup;
  
  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.supplierService.getList().subscribe(data => {
      this.suppliers = data;
      console.log(data);
    });

    this.initCreateSupplierForm();
  }

  initCreateSupplierForm(): void {
    this.createSupplierForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      address: new FormControl(),
    });
  }

  handle_add_supplier() {
    this.supplierService.add(this.createSupplierForm.value).subscribe(data => {
    let modal_close = document.querySelector("#modal_close") as HTMLElement;
    if (modal_close) {
      modal_close.click();
    }
    this.ngOnInit();
    });
  }

  update_supplier(id: number | undefined) {
    this.router.navigate(['supplier/update', id]);
  }

  delete_supplier(id: number | undefined) {
    if (id !== undefined) {
      this.supplierService.delete(id).subscribe(data => {
        this.ngOnInit();
      });
    } else {
      console.error('ID is undefined, cannot delete supplier.');
    }
  }

}
