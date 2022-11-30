package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Inventory;

public interface InventoryService {
	
	public List<Inventory> findAll();

	public void renewStockQty(Inventory inv, int qty);

}
