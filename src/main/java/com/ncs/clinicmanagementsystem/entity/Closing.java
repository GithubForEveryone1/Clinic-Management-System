package com.ncs.clinicmanagementsystem.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="closing")
public class Closing {

	@Id
	@Column(name="closing_date")
	private Date closing_date;
	
	@Column(name="description")
	private String description;

	public Date getClosing_date() {
		return closing_date;
	}

	public void setClosing_date(Date closing_date) {
		this.closing_date = closing_date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Closing(Date closing_date, String description) {
		this.closing_date = closing_date;
		this.description = description;
	}

	public Closing() {	}

	@Override
	public String toString() {
		return "Closing [closing_date=" + closing_date + ", description=" + description + "]";
	} 
	
}
