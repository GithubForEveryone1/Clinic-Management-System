package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.clinicmanagementsystem.dao.InventoryDAO;
import com.ncs.clinicmanagementsystem.entity.Inventory;

@Service
public class InventoryServiceImpl implements InventoryService{
	
	private InventoryDAO inventoryDAO;
	
	@Autowired
	public InventoryServiceImpl(InventoryDAO theInventoryDAO) {
		this.inventoryDAO = theInventoryDAO;
	}

	@Override
	@Transactional
	public List<Inventory> findAll() {
		return inventoryDAO.findAll();
	}

}
