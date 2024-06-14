import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../interface/product/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoryList!: Category[];

  createCategoryForm!: FormGroup;
  
  constructor (
    private categoryService: CategoryService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.categoryService.getList().subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList);
    });

    this.initCreateCategoryForm();
  }

  handle_add_category() {
    this.categoryService.add(this.createCategoryForm.value).subscribe(data => {
      let modal_close = document.querySelector("#modal_close") as HTMLElement;
        if (modal_close) {
          modal_close.click();
        }
        this.ngOnInit();
    });
  }

  initCreateCategoryForm(): void {
    this.createCategoryForm = new FormGroup({
      category: new FormControl(null, Validators.required),
    });
  }

  update_category(id: number | undefined) {
    this.router.navigate(['dashboard/product/category/update', id]);
  }

  delete_category(id: number | undefined) {
    if (id)
    this.categoryService.delete(id).subscribe(data => this.ngOnInit());
  }
}
