import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../login/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapComponent } from './map.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
declare var $: any;

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    let h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('COVID-19 Hotspot Map');
  });

  it('should have login button', () => {
    let button = fixture.nativeElement.querySelector('#map-login');
    expect(button.textContent).toEqual('Login');
  });

  it('should have week selector button and shows options on click', () => {
    let button = fixture.nativeElement.querySelector('#dropdownBasic1');
    let dropdowns = fixture.debugElement.queryAll(By.css('#option'));
    expect(button.textContent).toEqual('Past 2 Weeks');
    expect(dropdowns.length).toBe(2);
  });

  it('should render map', () => {
    let map = fixture.nativeElement.querySelector('#map');
    expect(map).not.toBeNull();
  });
});
