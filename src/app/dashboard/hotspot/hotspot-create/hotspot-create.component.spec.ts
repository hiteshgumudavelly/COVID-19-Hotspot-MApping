import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/login/auth.service';
import { AlertService } from '../../alert.service';

import { HotspotCreateComponent } from './hotspot-create.component';

describe('HotspotCreateComponent', () => {
  let component: HotspotCreateComponent;
  let fixture: ComponentFixture<HotspotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotspotCreateComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        AlertService, FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    let h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('Create New Hotspot');
  });

  it('form invalid when fields are empty', () => {
    expect(component.hotspotForm.valid).toBeFalsy();
  });

  it('should have submit button', () => {
    let button = fixture.nativeElement.querySelector('#create-submit');
    expect(button.textContent).toEqual('Submit');
  });

  it('should have Cancel button', () => {
    let button = fixture.nativeElement.querySelector('#cancel');
    expect(button.textContent).toEqual('Cancel');
  });

  it('Storing the hotspot details', () => {
    expect(component.hotspotForm.valid).toBeFalsy();
    component.hotspotForm.controls['siteName'].setValue("Footscary Market");
    component.hotspotForm.controls['address'].setValue("18 Irving St");
    component.hotspotForm.controls['suburbName'].setValue("Footscary");
    component.hotspotForm.controls['postcode'].setValue("3011");
    component.hotspotForm.controls['state'].setValue("VIC");
    component.hotspotForm.controls['country'].setValue("Australia");
    component.hotspotForm.controls['startDate'].setValue("26/05/2021 05:35P PM");
    component.hotspotForm.controls['endDate'].setValue("26/05/2021 07:35P PM");
    component.hotspotForm.controls['note'].setValue("Case has been there for 1 hour");
    component.onSubmit();
    let d = component.getHotspotFormData();
    expect(d.siteName).toBe("Footscary Market");
    expect(d.address).toBe("18 Irving St");
    expect(d.suburbName).toBe("Footscary");
    expect(d.postcode).toBe("3011");
    //expect(d.state).toBe("VIC");
    //expect(d.country).toBe("Australia");
    expect(d.startDate).toBe("26/05/2021 05:35P PM");
    expect(d.endDate).toBe("26/05/2021 07:35P PM");
    expect(d.note).toBe("Case has been there for 1 hour");
    
  });

});
