import { Component, OnInit } from '@angular/core';
import { AuthenicationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenicationService) {} 

  ngOnInit(): void {
    this.authenticationService.logout();
  }

}
