package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Inventory;

public interface InventoryDAO {

	public List<Inventory> findAll();

	public void renewStockQty(Inventory inv, int qty);

}
