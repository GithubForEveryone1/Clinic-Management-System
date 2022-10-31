import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  //templateUrl: './user-list.component.html',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  isError = false;
  errorMsg = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
      },
      error => this.handleErrorResponse(error) // kiv..
    )
  }

  handleErrorResponse(error:HttpErrorResponse) { //kiv..
    this.isError = true;
    this.errorMsg = error.error.message;
  }

}
