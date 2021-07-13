import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../login/auth.service';
import { AlertService } from './alert.service';
import { DashboardComponent } from './dashboard.component';
declare var $: any;

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ DashboardComponent ],
      providers: [
        { provide: AuthService },
        { provide: AlertService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sidebar menu', () => {
    let sidebar = fixture.nativeElement.querySelector('#sidebar-wrapper');
    expect(sidebar).not.toBeNull();
  });

  it('should have hotspot link in menu', () => {
    let menu = fixture.nativeElement.querySelectorAll('div.list-group > a');
    expect(menu[0].textContent).toBe('Hotspots');
  });

  it('should have map link in menu', () => {
    let menu = fixture.nativeElement.querySelectorAll('div.list-group > a');
    expect(menu[1].textContent).toBe('Map');
  });

  it('should have logout in menu', () => {
    let menu = fixture.nativeElement.querySelectorAll('div.list-group > a');
    expect(menu[2].textContent).toBe('Logout');
  });
});
