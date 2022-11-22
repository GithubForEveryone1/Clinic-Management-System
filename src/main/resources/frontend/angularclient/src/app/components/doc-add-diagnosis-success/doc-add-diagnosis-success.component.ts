import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doc-add-diagnosis-success',
  templateUrl: './doc-add-diagnosis-success.component.html',
  styleUrls: ['./doc-add-diagnosis-success.component.css']
})
export class DocAddDiagnosisSuccessComponent implements OnInit {

  diagnosisDetails = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.diagnosisDetails = params;
      console.log(params);
    })
  }

}
