import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'inventory-system';

  constructor(private el:ElementRef) {}
  
  ngOnInit(): void {
    
  }

  toggleDropdown(val: string) {
    console.log("Clicked dropdown:", val);
    let drpElem = document.querySelector(`.dropdown-container-${val}`);
    console.log("drpElem:", drpElem);
    drpElem?.classList.toggle('show');
  }
}
