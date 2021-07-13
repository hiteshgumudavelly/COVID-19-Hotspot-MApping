import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../../alert.service';
import { Hotspot } from '../hotspot';

import { HotspotDetailComponent } from './hotspot-detail.component';

describe('HotspotDetailComponent', () => {
  let component: HotspotDetailComponent;
  let fixture: ComponentFixture<HotspotDetailComponent>;
  let newHotspot: Hotspot = new Hotspot();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotspotDetailComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        AlertService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotDetailComponent);
    component = fixture.componentInstance;

    newHotspot.id = 1;
    newHotspot.siteName = "Bay 101 Cafe";
    newHotspot.address = "7/101 Bay Street";
    newHotspot.suburbName = "Port Melbourne";
    newHotspot.postcode = "3207";
    newHotspot.state = "VIC";
    newHotspot.country = "Australia";
    newHotspot.latitude = -37.8410152;
    newHotspot.longitude = 144.93986;
    newHotspot.startDate = new Date("2021-01-01");
    newHotspot.endDate = new Date("2021-01-01");
    newHotspot.note = "Case sat inside venue";

    component.hotspot = newHotspot;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    let h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('Hotspot Details');
  });

  it('should have card headers and labels', () => {
    let cardHeaders = fixture.nativeElement.querySelectorAll('.card-header');
    expect(cardHeaders[0].textContent).toContain('Site Info');
    expect(cardHeaders[1].textContent).toContain('Geolocation Info');
    expect(cardHeaders[2].textContent).toContain('Additional Info');

    let labels = fixture.nativeElement.querySelectorAll('label');
    expect(labels[0].textContent).toBe('Site Name');
    expect(labels[1].textContent).toBe('Address');
    expect(labels[2].textContent).toBe('Suburb Name');
    expect(labels[3].textContent).toBe('Postcode');
    expect(labels[4].textContent).toBe('State');
    expect(labels[5].textContent).toBe('Country');
    expect(labels[6].textContent).toBe('Latitude');
    expect(labels[7].textContent).toBe('Longitude');
    expect(labels[8].textContent).toBe('Start Date');
    expect(labels[9].textContent).toBe('End Date');
    expect(labels[10].textContent).toBe('Notes');

    
  });

  it('should have correct ngModel values in form', waitForAsync(() => {
    fixture.whenStable().then(() => {
      let inputs = fixture.nativeElement.querySelectorAll('input.form-control');

      expect(inputs[0].value).toBe('Bay 101 Cafe');
      expect(inputs[1].value).toBe('7/101 Bay Street');
      expect(inputs[2].value).toBe('Port Melbourne');
      expect(inputs[3].value).toBe('3207');
      expect(inputs[4].value).toBe('VIC');
      expect(inputs[5].value).toBe('Australia');
      expect(inputs[6].value).toBe('-37.8410152');
      expect(inputs[7].value).toBe('144.93986');
      expect(inputs[10].value).toBe('Case sat inside venue');
    });
  }));

  it('should have update button', () => {
    let button = fixture.nativeElement.querySelector('#hotspot-detail-update');
    expect(button.textContent).toEqual('Update');
  });

  it('should have delete button', () => {
    let button = fixture.nativeElement.querySelector('#hotspot-detail-delete');
    expect(button.textContent).toEqual('Delete');
  });

  it('should have back to list button', () => {
    let button = fixture.nativeElement.querySelector('#hotspot-detail-back');
    expect(button.textContent).toEqual('Back to List');
  });

  it('should have a popup appear when clicking delete button with correct label and buttons', () => {
    let button = fixture.nativeElement.querySelector('#hotspot-detail-delete');
    button.click();
    fixture.detectChanges();

    let modalHeader = fixture.nativeElement.querySelector('.modal-header');
    expect(modalHeader.textContent).toEqual('Are you sure you want to delete this hotspot?');

    let modalFooter = fixture.nativeElement.querySelector('.modal-footer');
    expect(modalFooter.textContent).toContain('Yes');
    expect(modalFooter.textContent).toContain('Cancel');
  });
});
