import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/common/request';

@Component({
  selector: 'app-nurse-view-req',
  templateUrl: './nurse-view-req.component.html',
  styleUrls: ['./nurse-view-req.component.css']
})
export class NurseViewReqComponent implements OnInit {
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  nurseId = this.loggedInUser.user_id;
  // requests array
  reqs: Request[] = [];

  constructor(
    private router: Router,
    private requestService: RequestService,
    private inventoryService: InventoryService,
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.requestService.getRequestByNurseId(this.nurseId).subscribe(
      data => {
        this.reqs = data;
        console.log(data);
        $(function(){
          $("#request").DataTable();
       });
      }
    )
  }

  checkStatus(status: string): string{
    if (status === 'approved') {
      return "approved";
    } else if (status === 'rejected') {
      return "rejected";
    } else {
      return "pending";
    }
  }

}
