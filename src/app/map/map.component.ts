import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.locatecontrol';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import * as moment from "moment";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: any;
  private layerGroup: any;
  errorMessage: string = "";
  infoMessage: string = "";
  isFetching: boolean = true;
  selectedDateRange = {
    id: 1,
    value: "Past 2 Weeks"
  };
  dateRanges = [
    {
      id: 1,
      value: "Past 2 Weeks"
    },
    {
      id: 2,
      value: "Past Week"
    }
  ];

  private initMap(): void {
    console.log("INITIALIZING MAP");
    this.map = L.map('map', {
      center: [ -37.806005653625135, 144.9374874388687 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    });

    tiles.addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);

    var lc = L.control.locate({
      keepCurrentZoomLevel: true,
      icon: "fa fa-map-pin"
    }).addTo(this.map);

    lc.start();
  }
  
  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit(): void {
    $("#menu-toggle").on("click", function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    $("#map-container").on("click", function(e) {
      e.preventDefault();
      $("#wrapper").removeClass("toggled");
    });
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.initData();
  }

  initData(): void {
    this.errorMessage = "";
    this.infoMessage = "";
    this.layerGroup.clearLayers()

    var pastDays = 14;
    if(this.selectedDateRange.id == 2)
    {
      pastDays = 7;
    }
    var today = new Date();

    var todayString = moment().format("YYYY-MM-DD");
    var pastDaysString = moment().subtract(pastDays, 'days').format("YYYY-MM-DD");

    console.log("FETCHING HOTSPOTS");
    this.isFetching = true;
    this.http.get('https://hotspotmapping-api-dev.azurewebsites.net/api/Hotspot/' + pastDaysString + '/' + todayString).subscribe(
      (res: any) => {
        if(res.length > 0) {
          for(const hotspot of res) {
            const marker = L.circle([hotspot.latitude, hotspot.longitude],
              { 
                radius: 3000,
                color: 'red'
              }
            );
            
            marker.bindPopup(
              "<b>" + hotspot.siteName + "</b><br />"
              + hotspot.address + "<br />" 
              + hotspot.suburbName + " " + hotspot.state + " " + hotspot.postcode + "<br />" 
              + "From " + new Date(hotspot.startDate).toLocaleString("en-AU") + " to " + new Date(hotspot.endDate).toLocaleString("en-AU") + "<br />" 
              + (hotspot.note == '' || hotspot.note == null ? '' : "Notes: " + hotspot.note),
              {
                maxWidth: 175
              }
            ).openPopup();

            marker.addTo(this.layerGroup);
          }
        }
        else {
          this.infoMessage = "There is no COVID-19 hotspot record for the selected date range";
        }
      },
      async err => {
        this.isFetching = false;
        this.errorMessage = "Unable to fetch COVID-19 hotspot records";
      },
      async () => {
        this.isFetching = false;
        console.log("FETCHING HOTSPOTS COMPLETED");
      }
    )
  }

  changeDateRange(dateRange: any): void {
    $("#wrapper").removeClass("toggled");
    this.selectedDateRange = dateRange;
    this.initData();
  }
}
