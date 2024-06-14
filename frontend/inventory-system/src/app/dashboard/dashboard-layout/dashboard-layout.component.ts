import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  router = inject(Router);
  
  toggleDropdown(val: string) {
    // console.log("Clicked dropdown:", val);
    let drpElem = document.querySelector(`.dropdown-container-${val}`);
    // console.log("drpElem:", drpElem);
    drpElem?.classList.toggle('show');
  }
  
  handle_logout() {
    let jwt_token = localStorage.getItem(environment.JWT_TOKEN);
    let modal_close = document.querySelector("#modal_close") as HTMLElement;
    if(jwt_token) {
      if (modal_close) {
        modal_close.click();
      }
      localStorage.removeItem(environment.JWT_TOKEN);
      this.router.navigate(['/auth/login']);
    }
  }
}
