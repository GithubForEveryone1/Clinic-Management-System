import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  firstName = sessionStorage.getItem("firstName")
  email = sessionStorage.getItem("email")
  gender = sessionStorage.getItem("gender")

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
      }
    )
  }
}
