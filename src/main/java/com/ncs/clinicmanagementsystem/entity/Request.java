package com.ncs.clinicmanagementsystem.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="request")
public class Request {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="request_id")
	private int request_id;
	
	@Column(name="nurse_id")
	private int nurse_id;
	
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name="nurse_id", insertable=false, updatable=false)
	private User nurse;
	
	@Column(name="inv_id")
	private int inv_id;
	
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name="inv_id", insertable=false, updatable=false)
	private Inventory product;
	
	@Column(name="req_qty")
	private int req_qty;
	
	@Column(name="status")
	private String status;
	
	@Column(name="date_created")
	@CreationTimestamp
	private Date date_created;

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

	public Date getDate_created() {
		return date_created;
	}

	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}
	
	public User getNurse() {
		return nurse;
	}

	public void setNurse(User nurse) {
		this.nurse = nurse;
	}

	@Override
	public String toString() {
		return "Request [request_id=" + request_id + ", nurse_id=" + nurse_id + ", nurse=" + nurse + ", inv_id="
				+ inv_id + ", product=" + product + ", req_qty=" + req_qty + ", status=" + status + ", date_created="
				+ date_created + "]";
	}

	public Request(int nurse_id, User nurse, int inv_id, Inventory product, int req_qty, String status,
			Date date_created) {
		super();
		this.nurse_id = nurse_id;
		this.nurse = nurse;
		this.inv_id = inv_id;
		this.product = product;
		this.req_qty = req_qty;
		this.status = status;
		this.date_created = date_created;
	}

	public Request() {}

}
