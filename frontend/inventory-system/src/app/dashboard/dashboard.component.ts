import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { DashboardDetail } from '../interface/dashboard/dashboard-detail';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashboardDetail: DashboardDetail | undefined;
  
  constructor (private dashboardService: DashboardService) {}
  
  ngOnInit(): void {
    this.dashboardService.detail().subscribe(data => {
      this.dashboardDetail = data;
      console.log(this.dashboardDetail);
    });
  }

}
