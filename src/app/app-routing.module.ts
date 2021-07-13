import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotspotCreateComponent } from './dashboard/hotspot/hotspot-create/hotspot-create.component';
import { HotspotDetailComponent } from './dashboard/hotspot/hotspot-detail/hotspot-detail.component';
import { HotspotListComponent } from './dashboard/hotspot/hotspot-list/hotspot-list.component';
import { HotspotUpdateComponent } from './dashboard/hotspot/hotspot-update/hotspot-update.component';
import { HotspotComponent } from './dashboard/hotspot/hotspot.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'hotspot', pathMatch: 'full' },
      { path: 'hotspot', component: HotspotComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: HotspotListComponent },
          { path: 'create', component: HotspotCreateComponent },
          { path: 'update/:hotspotId', component: HotspotUpdateComponent },
          { path: 'detail/:hotspotId', component: HotspotDetailComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
