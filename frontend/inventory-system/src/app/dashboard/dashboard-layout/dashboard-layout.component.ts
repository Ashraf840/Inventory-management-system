import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  toggleDropdown(val: string) {
    // console.log("Clicked dropdown:", val);
    let drpElem = document.querySelector(`.dropdown-container-${val}`);
    // console.log("drpElem:", drpElem);
    drpElem?.classList.toggle('show');
  }
  
}
