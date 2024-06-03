import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoryList: any | undefined;
  
  constructor (private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.getList().subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList);
    });
  }
  
}
