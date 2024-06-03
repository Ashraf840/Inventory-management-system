import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'inventory-system';

  constructor() {}
  
  ngOnInit(): void { }

  toggleDropdown(val: string) {
    // console.log("Clicked dropdown:", val);
    let drpElem = document.querySelector(`.dropdown-container-${val}`);
    // console.log("drpElem:", drpElem);
    drpElem?.classList.toggle('show');
  }
}
