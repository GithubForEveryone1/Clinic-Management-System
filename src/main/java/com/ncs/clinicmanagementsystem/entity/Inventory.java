package com.ncs.clinicmanagementsystem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class Inventory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="inv_id")
	private int inv_id;
	@Column(name="product_name")
	private String product_name;
	@Column(name="description")
	private String description;
	@Column(name="qty")
	private int qty;
	public int getInv_id() {
		return inv_id;
	}
	public void setInv_id(int inv_id) {
		this.inv_id = inv_id;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	@Override
	public String toString() {
		return "Inventory [inv_id=" + inv_id + ", product_name=" + product_name + ", description=" + description
				+ ", qty=" + qty + "]";
	}
	public Inventory(String product_name, String description, int qty) {
		super();
		this.product_name = product_name;
		this.description = description;
		this.qty = qty;
	}
	
	
}
