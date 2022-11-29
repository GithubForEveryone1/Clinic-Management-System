package com.ncs.clinicmanagementsystem.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="request")
public class Request {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="request_id")
	private int request_id;
	
	@Column(name="nurse_id")
	private int nurse_id;
	
	@Column(name="inv_id")
	private int inv_id;
	
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name="inv_id", insertable=false, updatable=false)
	private Inventory product;
	
	@Column(name="req_qty")
	private int req_qty;
	
	@Column(name="status")
	private String status;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getRequest_id() {
		return request_id;
	}

	public void setRequest_id(int request_id) {
		this.request_id = request_id;
	}

	public int getNurse_id() {
		return nurse_id;
	}

	public void setNurse_id(int nurse_id) {
		this.nurse_id = nurse_id;
	}

	public int getInv_id() {
		return inv_id;
	}

	public void setInv_id(int inv_id) {
		this.inv_id = inv_id;
	}

	public Inventory getProduct() {
		return product;
	}

	public void setProduct(Inventory product) {
		this.product = product;
	}

	public int getReq_qty() {
		return req_qty;
	}

	public void setReq_qty(int req_qty) {
		this.req_qty = req_qty;
	}

	public Request(int nurse_id, int inv_id, Inventory product, int req_qty, String status) {
		super();
		this.nurse_id = nurse_id;
		this.inv_id = inv_id;
		this.product = product;
		this.req_qty = req_qty;
		this.status = status;
	}

	@Override
	public String toString() {
		return "Request [request_id=" + request_id + ", nurse_id=" + nurse_id + ", inv_id=" + inv_id + ", product="
				+ product + ", req_qty=" + req_qty + ", status=" + status + "]";
	}

	public Request() {}

}
