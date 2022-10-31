import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  
  errorMessage = "You're not supposed to be here!!!";

  constructor() { }

  ngOnInit(): void {
  }

}
