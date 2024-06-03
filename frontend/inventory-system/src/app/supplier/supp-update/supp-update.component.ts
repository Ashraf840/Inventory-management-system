import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../interface/supplier/supplier';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supp-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './supp-update.component.html',
  styleUrl: './supp-update.component.css'
})
export class SuppUpdateComponent implements OnInit {

  id!: number;
  supplier!: Supplier;
  
  constructor(
    private route: ActivatedRoute, 
    private supplierService: SupplierService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    console.log("supp id:", this.id);

    this.supplierService.retrieve(this.id).subscribe(data => {
      this.supplier = data;

      console.log("result:", this.supplier);
      
      this.formData.name = this.supplier.name;
      this.formData.contact = this.supplier.contact;
      this.formData.email = this.supplier.email;
      this.formData.address = this.supplier?.address ? this.supplier?.address : '';
    })
  }

  formData = {
    name: '',
    contact: '',
    email: '',
    address: ''
  };

  update_supplier(id: number) {
    console.log("update function:", id);
    console.log("formdata:", this.formData);

    let updatedData = {
      id : id,
      name : this.formData.name,
      contact : this.formData.contact,
      email : this.formData.email,
      address : this.formData.address,
    }
    this.supplierService.update(updatedData).subscribe(data => {
      this.router.navigate(['/supplier']);
    });
  }
}
