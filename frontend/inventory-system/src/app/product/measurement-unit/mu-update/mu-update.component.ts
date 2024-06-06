import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MeasurementUnitService } from '../../../services/measurementt-unit.service';
import { MeasurementUnit } from '../../../interface/product/measurement-unit';

@Component({
  selector: 'app-mu-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './mu-update.component.html',
  styleUrl: './mu-update.component.css'
})
export class MuUpdateComponent implements OnInit {

  id!: number;

  measurementUnit!: MeasurementUnit;

  updateMeasurementUnitForm!: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private measurementUnitService: MeasurementUnitService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.measurementUnitService.retrieve(this.id).subscribe(data => {
      this.measurementUnit = data[0];
      this.updateMeasurementUnitForm.patchValue({
        id: this.measurementUnit?.id,
        measurement_unit: this.measurementUnit?.measurement_unit,
        abbreviation: this.measurementUnit?.abbreviation,
      });
    })
    this.initUpdateMeasurementUnitForm();
  }

  initUpdateMeasurementUnitForm(): void {
    this.updateMeasurementUnitForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      measurement_unit: new FormControl(null, Validators.required),
      abbreviation: new FormControl()
    });
  }

  handle_update_m_unit() {
    this.measurementUnitService.update(this.updateMeasurementUnitForm.value).subscribe(data => {
      this.router.navigate(['product/measurement-unit']);
    });
  }
}
