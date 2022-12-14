package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ncs.clinicmanagementsystem.entity.Inventory;
import com.ncs.clinicmanagementsystem.entity.Request;

@Repository
public class InventoryDAOHibernateImpl implements InventoryDAO{
	
	//define field for entity manager
	private EntityManager entityManager;
	
	//set up constructor injection
	@Autowired
	public InventoryDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	public List<Inventory> findAll() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// create a query
		Query<Inventory> theQuery = currentSession.createQuery("from Inventory", Inventory.class);
		
		// execute query and get result list
		List<Inventory> inventory = theQuery.getResultList();
		
		// return result 
		return inventory;
	}

	@Override
	public void renewStockQty(Inventory inv, int qty) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
					
		Inventory existingInventory = currentSession.find(Inventory.class, inv.getInv_id());
					
		// change qty
		int currentQty = existingInventory.getQty();
		int newQty = currentQty + qty;
		existingInventory.setQty(newQty);
					
		// update the request
		currentSession.update(existingInventory);
		
	}

}
