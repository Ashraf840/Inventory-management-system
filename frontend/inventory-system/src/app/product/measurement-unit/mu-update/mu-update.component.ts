import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasurementUnitService } from '../../../services/measurementt-unit.service';
import { MeasurementUnit } from '../../../interface/measurement-unit';

@Component({
  selector: 'app-mu-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mu-update.component.html',
  styleUrl: './mu-update.component.css'
})
export class MuUpdateComponent implements OnInit {

  id!: number;

  measurementUnit!: MeasurementUnit;

  constructor(
    private route: ActivatedRoute, 
    private measurementUnitService: MeasurementUnitService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
    // console.log("mu id:", typeof(this.id));

    this.measurementUnitService.retrieve(this.id).subscribe(data => {
      this.measurementUnit = data[0];
      
      // console.log("result:", this.measurementUnit);
      this.formData.measurement_unit = this.measurementUnit?.measurement_unit;
      this.formData.abbreviation = this.measurementUnit?.abbreviation ? this.measurementUnit?.abbreviation : '';
    })
  }

  formData = {
    measurement_unit: '',
    abbreviation: ''
  };

  update_m_unit(id: number) {
    console.log("update function:", id);
    console.log("formdata:", this.formData);

    let updatedData = {
      id : id,
      measurement_unit : this.formData.measurement_unit,
      abbreviation : this.formData.abbreviation,
    }
    this.measurementUnitService.update(updatedData).subscribe(data => {
      this.router.navigate(['product/measurement-unit']);
    });
  }

}
