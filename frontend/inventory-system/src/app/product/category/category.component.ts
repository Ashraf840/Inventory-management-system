import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoryList: any | undefined;
  
  constructor (
    private categoryService: CategoryService,
    private router: Router
  ) {}
  
  formData = {
    category: '',
  };
  
  ngOnInit(): void {
    this.categoryService.getList().subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList);
    });
  }

  add_category() {
    this.categoryService.add(this.formData).subscribe(data => {
      let category_modal_close = document.querySelector("#category_modal_close") as HTMLElement;
        if (category_modal_close) {
          category_modal_close.click();
        }
        this.ngOnInit();
    });
  }

  update_category(id: number) {
    this.router.navigate(['product/category/update', id]);
  }

  delete_category(id: number) {
    this.categoryService.delete(id).subscribe(data => this.ngOnInit());
  }
}
