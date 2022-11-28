package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.clinicmanagementsystem.entity.Inventory;
import com.ncs.clinicmanagementsystem.service.InventoryService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class InventoryRestController {
	
	private InventoryService inventoryService;
	
	public InventoryRestController(InventoryService theInventoryService) {
		this.inventoryService = theInventoryService;
	}
	
	// add mapping for GET /inventory
	@GetMapping("/inventory")
	public List<Inventory> findAll(){
		List<Inventory> theInventory;
		
		try {
			theInventory = inventoryService.findAll();
			System.out.println(theInventory);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		return theInventory;
	}

}
