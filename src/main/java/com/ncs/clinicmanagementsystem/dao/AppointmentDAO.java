package com.ncs.clinicmanagementsystem.dao;

import java.util.Date;
import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Appointment;

public interface AppointmentDAO {

	public List<Appointment> findAll();
	
	public List<Appointment> getApptsByUserId(int thePatientId);
	
	public void createApptByUserId(Appointment theAppt);
	
	public void editApptByApptId(Appointment theAppt);
	
	public void deleteApptByApptId(int theApptId);
	
	public List<Appointment> getApptsByDoctorId(int theDoctorId);
	
	public List<Appointment> getApptsByDate(Date theDate);
	
	public Appointment checkForDupAppt(Appointment theAppt);
	
}
