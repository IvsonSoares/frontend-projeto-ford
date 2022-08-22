import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends HomeComponent implements OnInit{

  constructor(
    router: Router,
    authService: AuthorizationService){
    super(router, authService);
  }

  ngOnInit(){
    this.setHomeInfo();
  }
}
