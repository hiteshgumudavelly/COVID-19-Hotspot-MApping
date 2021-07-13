import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../alert.service';
import { Hotspot } from '../hotspot';

@Component({
  selector: 'app-hotspot-create',
  templateUrl: './hotspot-create.component.html',
  styleUrls: ['./hotspot-create.component.scss']
})
export class HotspotCreateComponent implements OnInit {

  submitted = false;
  hotspotForm: FormGroup;
  errorMessage: string = "";


  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.createHotspotForm();
  }

  createHotspotForm(): void {
    let date = new Date();
    let now = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

    this.hotspotForm = this.fb.group({
      siteName: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      suburbName: ['', [Validators.required, Validators.maxLength(50)]],
      postcode: ['', [Validators.required, Validators.pattern("^(?!0000)[0-9]{4,4}$")]],
      state: [{ value: 'VIC', disabled: true }, Validators.required],
      country: [{ value: 'Australia', disabled: true }, Validators.required],
      startDate: [now, Validators.required],
      endDate: [now, [Validators.required]],
      note: ['']
    },
      {
        validator: this.validateDate('startDate', 'endDate')
      });
  }

  get hotspotFormControl() {
    return this.hotspotForm.controls;
  }

  validateDate(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        group.controls.startDate.setErrors({ dates: true });
        group.controls.endDate.setErrors({ dates: true });
      }
      else {
        group.controls.startDate.setErrors(null);
        group.controls.endDate.setErrors(null);
      }
      return {};
    }
  }

  getHotspotFormData() {
    return {
      "siteName": this.hotspotForm.value.siteName,
      "address": this.hotspotForm.value.address,
      "suburbName": this.hotspotForm.value.suburbName,
      "postcode": this.hotspotForm.value.postcode,
      "state": this.hotspotForm.value.state,
      "country": this.hotspotForm.value.country,
      "startDate": this.hotspotForm.value.startDate,
      "endDate": this.hotspotForm.value.endDate,
      "note": this.hotspotForm.value.note
    }
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = "";
    /*Communicate with api and submit hotspot data httppost request to api*/
    if (this.hotspotForm.valid) {
      const headers = { 'content-type': 'application/json' }

      this.http.post<Hotspot>('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/', this.getHotspotFormData(), { 'headers': headers }).subscribe(
        data => {
          this.router.navigate(['/dashboard/hotspot/detail/' + data.id]);
          this.alertService.setAlert("New hotspot successfully created");
        },
        async err => {
          this.errorMessage = "Unable to create new hotspot";
        }
      )
    }
  }


}
