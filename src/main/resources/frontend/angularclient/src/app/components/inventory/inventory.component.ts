import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/common/inventory';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as bootstrap from 'bootstrap';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  nurseId = this.loggedInUser.user_id;

  // inventory list
  inventory: Inventory[] = [];
  error = "";

  stock = NaN;
  productName = '';
  invId = NaN;
  qty = NaN;

  constructor(
    private router: Router, 
    private inventoryService: InventoryService, 
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService,
    private requestService: RequestService) { }

  ngOnInit(): void {
    this.inventoryService.getInventoryList().subscribe(
      data => {
        this.inventory = data;
        $(function(){
          $("#inventory").DataTable();
       });
        console.log(this.inventory);
      },
      // error => this.handleErrorResponse(error),
    );
  }

  checkStock(stock: number): string{
    if(stock <= 30){
      return 'true'; 
    }
    else {
      return 'false';
    }
  }

  showFormModal(productName: string, invId: number){
    $('#myModalCenter').modal('show');
    this.productName = productName;
    this.invId = invId;
  }

  closeFormModal(){
    $('#myModalCenter').modal('hide');
  }

  addRequest(){
    // This is POSTed to the backend
    let req = {
      "inv_id": this.invId,
      "nurse_id": this.nurseId,
      "req_qty": this.qty,
      "status": "pending",
    };

    this.requestService.addRequest(req).subscribe(
      data =>{
        console.log(data);
      }
    )
   
  }

}
