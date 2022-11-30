import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/common/request';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-doc-view-req',
  templateUrl: './doc-view-req.component.html',
  styleUrls: ['./doc-view-req.component.css']
})
export class DocViewReqComponent implements OnInit {

  // requests array
  reqs: Request[] = [];

  request_id = NaN;

  constructor(
    private router: Router,
    private requestService: RequestService,
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.requestService.viewRequests().subscribe(
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

  approveRequest(request_id: number) {
    let req = {
      "request_id": request_id,
      "status": ""
    }
    this.requestService.approveRequest(req).subscribe(
      data=>{
        console.log(data);
        this.ngOnInit();
      }
    )
  }

  rejectRequest(request_id: number){
    let req = {
      "request_id": request_id,
      "status": ""
    }
    this.requestService.rejectRequest(req).subscribe(
      data=>{
        console.log(data);
        this.ngOnInit();
      }
    )
  }
}
