package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.clinicmanagementsystem.entity.Inventory;
import com.ncs.clinicmanagementsystem.entity.Request;
import com.ncs.clinicmanagementsystem.service.InventoryService;
import com.ncs.clinicmanagementsystem.service.RequestService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class InventoryRestController {
	
	private InventoryService inventoryService;
	private RequestService requestService;
	
	public InventoryRestController(InventoryService theInventoryService, RequestService theRequestService) {
		this.inventoryService = theInventoryService;
		this.requestService = theRequestService;
	}
	
	// add mapping for GET /inventory
	@GetMapping("/inventory")
	public List<Inventory> findAll(){
		List<Inventory> theInventory;
		
		try {
			theInventory = inventoryService.findAll();
//			System.out.println(theInventory);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		return theInventory;
	}
	
	// update the inventory quantity 
	@PutMapping("/inventory/renew-stock-qty")
	public Inventory renewStockQty(@RequestBody Request req){
		Inventory inv;
		int qty;
		
		try {
			inv = req.getProduct();
			qty = req.getReq_qty();
			
			inventoryService.renewStockQty(inv,qty);
		}
		catch(Exception e) {
			throw new RuntimeException("Could not update inventory due to unknown error :(");
		}
		return inv;
	}
	

}
