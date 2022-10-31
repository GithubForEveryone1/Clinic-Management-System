import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  
  firstName = sessionStorage.getItem("firstName")
  email = sessionStorage.getItem("email")
  gender = sessionStorage.getItem("gender")

  constructor() { }

  ngOnInit(): void {
  }

}
