import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MeasurementUnitService } from '../../services/measurementt-unit.service';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement-unit',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule ],
  templateUrl: './measurement-unit.component.html',
  styleUrl: './measurement-unit.component.css'
})
export class MeasurementUnitComponent implements OnInit {

  measurementUnits: any;

  createMeasurementUnitForm!: FormGroup;

  constructor (
    private measurementUnitService: MeasurementUnitService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.measurementUnitService.getList().subscribe(data => {
      this.measurementUnits = data;
      console.log(this.measurementUnits);
    });
    this.initCreateMeasurementUnitForm();
  }

  handle_add_measurement_unit() {
    this.measurementUnitService.add(this.createMeasurementUnitForm.value).subscribe(data => {
      let modal_close = document.querySelector("#modal_close") as HTMLElement;
        if (modal_close) {
          modal_close.click();
        }
        this.ngOnInit();
    });
  }

  initCreateMeasurementUnitForm(): void {
    this.createMeasurementUnitForm = new FormGroup({
      measurement_unit: new FormControl(null, Validators.required),
      abbreviation: new FormControl(),
    });
  }

  update_m_unit(id: number) {
    this.router.navigate(['product/measurement-unit/update', id]);
  }

  delete_m_unit(id: number) {
    this.measurementUnitService.delete(id).subscribe(data => this.ngOnInit());
  }
}
