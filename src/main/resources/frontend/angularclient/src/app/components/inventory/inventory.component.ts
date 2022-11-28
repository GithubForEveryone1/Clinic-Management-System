import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/common/inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // inventory list
  inventory: Inventory[] = [];

  constructor(private router: Router, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getInventoryList().subscribe(
      data => {
        this.inventory = data;
        console.log(this.inventory);
      }
    )
  }

}
