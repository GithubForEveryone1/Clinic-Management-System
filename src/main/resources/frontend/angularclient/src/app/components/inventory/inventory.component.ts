import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/common/inventory';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // inventory list
  inventory: Inventory[] = [];
  error = "";

  constructor(private router: Router, private inventoryService: InventoryService, private route: ActivatedRoute) { }

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

}
