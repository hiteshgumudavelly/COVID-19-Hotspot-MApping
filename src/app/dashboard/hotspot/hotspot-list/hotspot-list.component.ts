import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../alert.service';
import { Hotspot } from '../hotspot';

@Component({
  selector: 'app-hotspot-list',
  templateUrl: './hotspot-list.component.html',
  styleUrls: ['./hotspot-list.component.scss']
})
export class HotspotListComponent implements OnInit {
  hotspots: Hotspot[] = [];
  pagedHotspots: Hotspot[] = [];
  errorMessage: string = "";
  infoMessage: string = "";
  successMessage: string = "";
  fetchingMessage: string = "";
  isFetching: boolean = false;
  page = 1;
  pageSize = 8;
  collectionSize: number = 0;
  searchText: string = '';
  notFound: boolean = false;

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.init(false);
  }

  init(refresh: boolean): void {
    this.isFetching = true;
    this.errorMessage = "";
    this.infoMessage = "";
    this.successMessage = "";
    this.fetchingMessage = "Fetching COVID-19 Hotspots";

    // communicate to the API and then assign the response of th API call to hotspots array
    this.http.get<Hotspot[]>('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/').subscribe(
      (response: Hotspot[]) => {
        if (response.length > 0) {
          this.hotspots = response;
          this.hotspots = response.sort((a, b) => a.suburbName > b.suburbName ? 1 : a.suburbName === b.suburbName ? 0 : -1);

          this.refreshHotspots(false);
          if(refresh)
          {
            this.successMessage = "Successfully refreshed hotspot list";
          }
          else
          {
            if(this.alertService.getAlert() != "")
              this.successMessage = this.alertService.getAlert();
          }
        }
        else {
          this.infoMessage = "There is no COVID-19 hotspot record";
        }
      },
      async err => {
        this.isFetching = false;
        this.errorMessage = "Unable to fetch COVID-19 hotspot records";
        this.fetchingMessage = "";
      },
      async () => {
        this.isFetching = false;
        this.fetchingMessage = "";
        console.log("FETCHING HOTSPOTS COMPLETED");
      }
    )
  }

  refreshData(): void {
    this.isFetching = true;
    this.errorMessage = "";
    this.infoMessage = "";
    this.successMessage = "";
    this.fetchingMessage = "Refreshing COVID-19 Hotspots";
    this.http.get('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/Refresh').subscribe(
      response => {
        this.hotspots = [];
        this.refreshHotspots(false);
        this.fetchingMessage = "";
        this.isFetching = false;
        this.init(true);
      },
      err => {
        this.isFetching = false;
        this.errorMessage = err.message;
        this.fetchingMessage = "";
      },
      () => {
        console.log("REFRESHING HOTSPOTS COMPLETED");
      }
    );
  }

  navigateToDetailsPage(id: number) {
    this.router.navigate(['/dashboard/hotspot/detail/' + id])
  }

  refreshHotspots(isSearch: boolean): void {
    if(isSearch) this.page = 1;

    var hotspotsList = this.hotspots
    .filter((item:any) => {
      return Object.keys(item).some(
        k =>
          item[k] != null &&
          item[k]
            .toString()
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
      )
    });

    this.pagedHotspots = hotspotsList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    
    this.collectionSize = hotspotsList.length;
    if(hotspotsList.length > 0)
    {
      this.notFound = false;
    }
    else
    {
      this.notFound = true;
    }
  }
}
