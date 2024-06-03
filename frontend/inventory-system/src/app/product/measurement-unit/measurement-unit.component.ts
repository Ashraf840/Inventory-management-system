import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MeasurementUnitService } from '../../services/measurementt-unit.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement-unit',
  standalone: true,
  imports: [NgFor, FormsModule ],
  templateUrl: './measurement-unit.component.html',
  styleUrl: './measurement-unit.component.css'
})
export class MeasurementUnitComponent implements OnInit {

  @ViewChild('updateModal') updateModal!: ElementRef;
  
  measurementUnits: any;

  constructor (
    private measurementUnitService: MeasurementUnitService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.measurementUnitService.getList().subscribe(data => {
      this.measurementUnits = data;
      console.log(this.measurementUnits);
    });
  }
  
  formData = {
    measurement_unit: '',
    abbreviation: ''
  };

  add_m_unit() {
    this.measurementUnitService.add(this.formData).subscribe(data => {
      let m_unit_modal_close = document.querySelector("#m_unit_modal_close") as HTMLElement;
        if (m_unit_modal_close) {
          m_unit_modal_close.click();
        }
        this.ngOnInit();
    });
  }

  update_m_unit(id: number) {
    console.log("id", id);
    this.router.navigate(['product/measurement-unit/update', id]);
  }

  delete_m_unit(id: number) {
    this.measurementUnitService.delete(id).subscribe(data => this.ngOnInit());
  }
  
}
