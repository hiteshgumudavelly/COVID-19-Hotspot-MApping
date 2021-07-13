import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../alert.service';
import { Hotspot } from '../hotspot';

@Component({
  selector: 'app-hotspot-update',
  templateUrl: './hotspot-update.component.html',
  styleUrls: ['./hotspot-update.component.scss']
})
export class HotspotUpdateComponent implements OnInit {
  hotspot: Hotspot = new Hotspot()
  submitted = false;
  hotspotForm: FormGroup;
  errorMessage: string = "";
  isFetching: boolean = false;



  constructor(private route: ActivatedRoute,private http: HttpClient, private fb: FormBuilder, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.createHotspotForm();
    let id = this.route.snapshot.paramMap.get('hotspotId');
    this.isFetching = true;
    this.http.get<Hotspot>('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/' + id).subscribe(
      (response: Hotspot) => {
        this.isFetching = false;
        this.hotspot = response;
        this.hotspotForm.patchValue({
          id : this.hotspot.id,
          siteName : this.hotspot.siteName,
          address : this.hotspot.address,
          suburbName : this.hotspot.suburbName,
          postcode : this.hotspot.postcode,
          startDate : this.hotspot.startDate,
          endDate : this.hotspot.endDate,
          note : this.hotspot.note
        })
      },
      async err => {
        this.isFetching = false;
        this.errorMessage = "Unable to fetch COVID-19 hotspot details";
      })
    
   }

   

  createHotspotForm(): void {
    this.hotspotForm = this.fb.group({
      id : [{ value: '', disabled: true },Validators.required ],
      siteName: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      suburbName: ['', [Validators.required, Validators.maxLength(50)]],
      postcode: ['', [Validators.required, Validators.pattern("^(?!0000)[0-9]{4,4}$")]],
      state: [{ value: 'VIC', disabled: true }, Validators.required],
      country: [{ value: 'Australia', disabled: true }, Validators.required],
      startDate: [ Validators.required],
      endDate:  [Validators.required],
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
      "id" : this.hotspotForm.getRawValue().id,
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
    /*Communicate with api and submit hotspot data httput request to api*/
    if (this.hotspotForm.valid) {
      const headers = { 'content-type': 'application/json' }
      let id = this.route.snapshot.paramMap.get('hotspotId');
      let hotspotdata = this.getHotspotFormData();
      this.http.put<Hotspot>('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/' + id, hotspotdata, { 'headers': headers }).subscribe(
        data => {
          this.router.navigate(['/dashboard/hotspot/detail/' + data.id]);
          this.alertService.setAlert("Hotspot updated successfully");
        },
        async err => {
          this.errorMessage = "Unable to update hotspot";
        }
      )
      
      }
  }
  goToDetails() {
    this.router.navigate(['/dashboard/hotspot/detail/' + this.route.snapshot.paramMap.get('hotspotId')]);
  }



  
}
