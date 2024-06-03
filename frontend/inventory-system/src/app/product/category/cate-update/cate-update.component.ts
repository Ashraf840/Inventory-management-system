import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interface/product/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cate-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cate-update.component.html',
  styleUrl: './cate-update.component.css'
})
export class CateUpdateComponent implements OnInit {

  id!: number;

  category!: Category;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);

    this.categoryService.retrieve(this.id).subscribe(data => {
      this.category = data[0];
      
      this.formData.category = this.category?.category;
    })
  }

  formData = {
    category: '',
  };

  update_category(id: number) {
    let updatedData = {
      id : id,
      category : this.formData.category
    }
    console.log(updatedData)
    this.categoryService.update(updatedData).subscribe(data => {
      this.router.navigate(['product/category']);
    });
  }

}
