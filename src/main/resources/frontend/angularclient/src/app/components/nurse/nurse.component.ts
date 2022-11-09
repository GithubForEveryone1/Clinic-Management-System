import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;
  accountType = this.loggedInUser.account_type;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.accountType != 'nurse') {
      this.router.navigate(['error']);
    }
  }

}
