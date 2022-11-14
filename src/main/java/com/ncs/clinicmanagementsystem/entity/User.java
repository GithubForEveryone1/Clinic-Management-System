package com.ncs.clinicmanagementsystem.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="user")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private int user_id;
	@Column(name="first_name")
	private String first_name;
	@Column(name="last_name")
	private String last_name;
	@Column(name="email")
	private String email;
	@Column(name="address")
	private String address;
	@Column(name="contact_number")
	private String contact_number;
	@Column(name="password")
	private String password;
	@Column(name="dob")
	private Date dob;
	@Column(name="gender")
	private String gender;
	@Column(name="account_type")
	private String account_type;
	@Column(name="date_created")
	@CreationTimestamp
	private Date date_created;
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getContact_number() {
		return contact_number;
	}
	public void setContact_number(String contact_number) {
		this.contact_number = contact_number;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAccount_type() {
		return account_type;
	}
	public void setAccount_type(String account_type) {
		this.account_type = account_type;
	}
	public Date getDate_created() {
		return date_created;
	}
	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}
	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", first_name=" + first_name + ", last_name=" + last_name + ", email="
				+ email + ", address=" + address + ", contact_number=" + contact_number + ", password=" + password
				+ ", dob=" + dob + ", gender=" + gender + ", account_type=" + account_type + ", date_created="
				+ date_created + "]";
	}
	public User(String first_name, String last_name, String email, String address, String contact_number, String password,
			Date dob, String gender, String account_type, Date date_created) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.address = address;
		this.contact_number = contact_number;
		this.password = password;
		this.dob = dob;
		this.gender = gender;
		this.account_type = account_type;
		this.date_created = date_created;
	}
	
	public User() {};
	
}
