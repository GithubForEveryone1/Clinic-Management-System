import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/common/request';

@Component({
  selector: 'app-doc-view-req',
  templateUrl: './doc-view-req.component.html',
  styleUrls: ['./doc-view-req.component.css']
})
export class DocViewReqComponent implements OnInit {

  // requests array
  reqs: Request[] = [];

  constructor(private requestService: RequestService) { }

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

}
