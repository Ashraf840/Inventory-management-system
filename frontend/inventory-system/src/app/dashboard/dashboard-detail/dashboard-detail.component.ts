import { Component } from '@angular/core';
import { DashboardDetail } from '../../interface/dashboard/dashboard-detail';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-detail',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.css'
})
export class DashboardDetailComponent {
  dashboardDetail: DashboardDetail | undefined;
  
  constructor (private dashboardService: DashboardService) {}
  
  ngOnInit(): void {
    this.dashboardService.detail().subscribe(data => {
      this.dashboardDetail = data;
      console.log(this.dashboardDetail);
    });
  }
}
