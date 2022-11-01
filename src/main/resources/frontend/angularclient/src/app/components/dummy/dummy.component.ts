import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  
  //firstName = sessionStorage.getItem("firstName")
  //email = sessionStorage.getItem("email")
  //gender = sessionStorage.getItem("gender")
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  firstName = this.loggedInUser.first_name;
  email = this.loggedInUser.email;
  gender = this.loggedInUser.gender;

  constructor() { }

  ngOnInit(): void {
    console.log(this.loggedInUser);
  }

}
