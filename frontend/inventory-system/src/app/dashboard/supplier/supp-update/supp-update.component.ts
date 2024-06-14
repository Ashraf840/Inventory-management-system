import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supplier } from '../../../interface/supplier/supplier';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-supp-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supp-update.component.html',
  styleUrl: './supp-update.component.css'
})
export class SuppUpdateComponent implements OnInit {

  id!: number;

  supplier!: Supplier;

  updateSupplierForm!: FormGroup;
  
  constructor(
    private route: ActivatedRoute, 
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initUpdateSupplierForm();

    this.id = parseInt(this.route.snapshot.params['id']);
    console.log("supp id:", this.id);

    this.supplierService.retrieve(this.id).subscribe(data => {
      this.supplier = data;

      console.log("result:", this.supplier);
      if (this.supplier?.id && this.supplier?.address)
        this.supplierFormPatchValue(this.supplier?.id, this.supplier?.name, this.supplier?.contact, this.supplier?.email, this.supplier?.address);
    })

  }

  initUpdateSupplierForm(): void {
    this.updateSupplierForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      address: new FormControl(),
    });
  }

  supplierFormPatchValue(id: number, name: string, contact: string, email: string, address: string) {
    this.updateSupplierForm.patchValue({
      id: id,
      name: name,
      contact: contact,
      email: email,
      address: address
    });
  }

  handle_update_supplier() {
    this.supplierService.update(this.updateSupplierForm.value).subscribe(data => {
      this.router.navigate(['/supplier']);
    });
  }
}
