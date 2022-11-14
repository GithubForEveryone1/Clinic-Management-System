package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Appointment;

public interface AppointmentService {

public List<Appointment> findAll();
	
	public List<Appointment> getApptsByUserId(int thePatientId);
	
	public void createApptByUserId(Appointment theAppt);
	
	public void editApptByApptId(Appointment theAppt);
	
	public void deleteApptByApptId(int theApptId);
	
	public List<Appointment> getApptsByDoctorId(int theDoctorId);
}
