import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        AuthService, FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('Login to the dashboard', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue("admin");
    component.form.controls['password'].setValue("P@ssw0rd1!");
    expect(component.form.valid).toBeTruthy();
    // Trigger the login function
    component.login();
    let l = component.loginDetails;

    expect(l.email).toBe("admin");
    expect(l.password).toBe("P@ssw0rd1!");

    
  });
});
