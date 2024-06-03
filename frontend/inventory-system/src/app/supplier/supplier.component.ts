import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../interface/supplier/supplier';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  suppliers!: Supplier[];

  supplier!: Supplier;
  
  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.supplierService.getList().subscribe(data => {
      this.suppliers = data;
      console.log(data);
    });
  }

  formData = {
    name: '',
    contact: '',
    email: '',
    address: ''
  };

  add_supplier() {
    this.supplier = this.formData;
    this.supplierService.add(this.supplier).subscribe(data => {
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
    console.log("delete id:", id)
    
    if (id !== undefined) {
      this.supplierService.delete(id).subscribe(data => {
        this.ngOnInit();
      });
    } else {
      console.error('ID is undefined, cannot delete supplier.');
    }
  }

}
