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

@Entity
@Table(name="appointment")
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="appt_id")
	private int appt_id;
	
	@Column(name="patient_id")
	private int patient_id;
	
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name="patient_id", insertable=false, updatable=false)
	private User patient;
	
	@Column(name="doctor_id")
	private int doctor_id;
	
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinColumn(name="doctor_id", insertable=false, updatable=false)
	private User doctor;
	
	@Column(name="date_visited")
	private Date date_visited;
	@Column(name="timeslot")
	private int timeslot;
	@Column(name="diagnosis")
	private String diagnosis;
	@Column(name="prescription")
	private String prescription;
	public int getAppt_id() {
		return appt_id;
	}
	public void setAppt_id(int appt_id) {
		this.appt_id = appt_id;
	}
	public int getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	public int getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	public Date getDate_visited() {
		return date_visited;
	}
	public void setDate_visited(Date date_visited) {
		this.date_visited = date_visited;
	}
	public int getTimeslot() {
		return timeslot;
	}
	public void setTimeslot(int timeslot) {
		this.timeslot = timeslot;
	}
	public String getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}
	public String getPrescription() {
		return prescription;
	}
	public void setPrescription(String prescription) {
		this.prescription = prescription;
	}
	
	
	public User getPatient() {
		return patient;
	}
	public void setPatient(User patient) {
		this.patient = patient;
	}
	public User getDoctor() {
		return doctor;
	}
	public void setDoctor(User doctor) {
		this.doctor = doctor;
	}
	
	@Override
	public String toString() {
		return "Appointment [appt_id=" + appt_id + ", patient_id=" + patient_id + ", doctor_id=" + doctor_id
				+ ", date_visited=" + date_visited + ", timeslot=" + timeslot + ", diagnosis=" + diagnosis
				+ ", prescription=" + prescription + "]";
	}
	public Appointment(int patient_id, int doctor_id, Date date_visited, int timeslot, String diagnosis,
			String prescription) {
		super();
		this.patient_id = patient_id;
		this.doctor_id = doctor_id;
		this.date_visited = date_visited;
		this.timeslot = timeslot;
		this.diagnosis = diagnosis;
		this.prescription = prescription;
	}
	public Appointment() {}
	
}
