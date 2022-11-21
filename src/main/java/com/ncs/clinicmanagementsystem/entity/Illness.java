package com.ncs.clinicmanagementsystem.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="illness")
public class Illness {

	@Id
	@Column(name="name")
	private String name;

	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Illness " + this.name;
	}
	public Illness(String name) {
		this.name = name;
	}
	public Illness() {}
	
}
