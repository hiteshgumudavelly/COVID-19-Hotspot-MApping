import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HotspotComponent } from './dashboard/hotspot/hotspot.component';
import { MapComponent } from './map/map.component';
import { HotspotListComponent } from './dashboard/hotspot/hotspot-list/hotspot-list.component';
import { HotspotCreateComponent } from './dashboard/hotspot/hotspot-create/hotspot-create.component';
import { HotspotDetailComponent } from './dashboard/hotspot/hotspot-detail/hotspot-detail.component';
import { HotspotUpdateComponent } from './dashboard/hotspot/hotspot-update/hotspot-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth.guard';
import { AlertService } from './dashboard/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HotspotComponent,
    MapComponent,
    HotspotListComponent,
    HotspotCreateComponent,
    HotspotDetailComponent,
    HotspotUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
