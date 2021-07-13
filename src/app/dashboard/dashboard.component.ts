import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../login/auth.service';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.router.events.subscribe((val) => {
      $("#wrapper").removeClass("toggled");
      
      if(val instanceof NavigationStart) {
        this.alertService.clear();
      }
    });

    $(".container-fluid").on("click", function(e) {
      $("div#wrapper").removeClass("toggled");
    });
    
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
