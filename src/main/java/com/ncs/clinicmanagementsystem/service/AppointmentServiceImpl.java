package com.ncs.clinicmanagementsystem.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.clinicmanagementsystem.dao.AppointmentDAO;
import com.ncs.clinicmanagementsystem.entity.Appointment;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	private AppointmentDAO apptDAO;
	
	@Autowired
	public AppointmentServiceImpl(AppointmentDAO theApptDAO) {
		this.apptDAO = theApptDAO;
	}

	@Override
	@Transactional
	public List<Appointment> findAll() {
		return apptDAO.findAll();
	}

	@Override
	@Transactional
	public List<Appointment> getApptsByUserId(int thePatientId) {
		return apptDAO.getApptsByUserId(thePatientId);
	}

	@Override
	@Transactional
	public void createApptByUserId(Appointment theAppt) {
		apptDAO.createApptByUserId(theAppt);

	}

	@Override
	@Transactional
	public void editApptByApptId(Appointment theAppt) {
		apptDAO.editApptByApptId(theAppt);

	}

	@Override
	@Transactional
	public void deleteApptByApptId(int theApptId) {
		apptDAO.deleteApptByApptId(theApptId);

	}
	
	@Override
	@Transactional
	public List<Appointment> getApptsByDoctorId(int theDoctorId) {
		return apptDAO.getApptsByDoctorId(theDoctorId);
	}

	@Override
	@Transactional
	public List<Appointment> getApptsByDate(Date theDate) {
		return apptDAO.getApptsByDate(theDate);
	}

	@Override
	@Transactional
	public Appointment checkForDupAppt(Appointment theAppt) {
		return apptDAO.checkForDupAppt(theAppt);
	}
	
}
