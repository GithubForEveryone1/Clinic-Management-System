import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/common/inventory';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // inventory list
  inventory: Inventory[] = [];
  error = "";

  stock = NaN;
  product_name = '';

  constructor(private router: Router, private inventoryService: InventoryService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

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

  showFormModal(product_name: string){
    $('#myModalCenter').modal('show');
    this.product_name = product_name;
  }

  closeFormModal(){
    $('#myModalCenter').modal('hide');
  }

}
