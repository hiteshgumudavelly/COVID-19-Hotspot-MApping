import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AlertService } from '../../alert.service';
import { Hotspot } from '../hotspot';
@Component({
  selector: 'app-hotspot-detail',
  templateUrl: './hotspot-detail.component.html',
  styleUrls: ['./hotspot-detail.component.scss']
  
})
export class HotspotDetailComponent implements OnInit {
  hotspot: Hotspot = new Hotspot()
  @ViewChild('closebutton') closebutton : any;
  isFetching: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";
  constructor(private route: ActivatedRoute, private http: HttpClient, private alertService: AlertService,private router: Router) { }
  ngOnInit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    let id = this.route.snapshot.paramMap.get('hotspotId');
    this.isFetching = true;
    this.http.get<Hotspot>('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/' + id).subscribe(
      (response: Hotspot) => {
        console.log(response);
        this.isFetching = false;
        this.hotspot = response;

        if(this.alertService.getAlert() != "")
          this.successMessage = this.alertService.getAlert();
      },
      async err => {
        this.isFetching = false;
        this.errorMessage = "Unable to fetch COVID-19 hotspot details";
      },
    )
  }
  deleteHotspot() {
    this.errorMessage = "";
    this.successMessage = "";
    this.http
      .delete(
        "https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/" + this.hotspot.id
      )
      .subscribe(
        (response) => {
          this.closebutton.nativeElement.click();
          this.router.navigate(['/dashboard/hotspot/list']);
          this.alertService.setAlert("Successfully deleted hotspot record");
        },
        async (err) => {
          this.closebutton.nativeElement.click();
          this.errorMessage = "Unable to delete hotspot record";
        }
      );
  }

  goToUpdate() {
    this.router.navigate(['/dashboard/hotspot/update/' + this.route.snapshot.paramMap.get('hotspotId')]);
  }
}

