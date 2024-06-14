import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../interface/product/category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-cate-update',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cate-update.component.html',
  styleUrl: './cate-update.component.css'
})
export class CateUpdateComponent implements OnInit {

  id!: number;

  category!: Category;

  updateCategoryForm!: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);

    this.categoryService.retrieve(this.id).subscribe(data => {
      this.category = data[0];
      this.populateUpdateCategoryForm(this.category);
    })

    this.initCategoryForm();
  }

  initCategoryForm (): void {
    this.updateCategoryForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
    });
  }

  populateUpdateCategoryForm (data: Category) {
    this.updateCategoryForm.patchValue({
      id: data?.id,
      category: data?.category
    });
  }

  handle_update_category () {
    // console.log(this.updateCategoryForm.value);

    this.categoryService.update(this.updateCategoryForm.value).subscribe(data => {
      this.router.navigate(['dashboard/product/category']);
    })
  }
}
