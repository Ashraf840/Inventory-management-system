import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: any | undefined;
  
  constructor (private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.getList(). subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

}
