package com.ncs.clinicmanagementsystem.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ncs.clinicmanagementsystem.entity.Appointment;
import com.ncs.clinicmanagementsystem.entity.User;

@Repository
public class AppointmentDAOHibernateImpl implements AppointmentDAO {

	// define field for entitymanager
	private EntityManager entityManager;
	
	// set up constructor injection
	@Autowired
	public AppointmentDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	
	@Override
	public List<Appointment> findAll() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// create a query
		Query<Appointment> theQuery = currentSession.createQuery("from Appointment", Appointment.class);
		
		// execute query and get result list
		List<Appointment> appts = theQuery.getResultList();
		
		// return the results
		return appts;
		
	}

	@Override
	public List<Appointment> getApptsByUserId(int thePatientId) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// get the appts for user id
		Criteria criteria = currentSession.createCriteria(Appointment.class);
		List<Appointment> userAppts = criteria.add(Restrictions.eqOrIsNull("patient_id", thePatientId)).list();
		
		return userAppts;
	}

	@Override
	public void createApptByUserId(Appointment theAppt) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
				
		// Save user.
		currentSession.saveOrUpdate(theAppt);

	}

	@Override
	public void editApptByApptId(Appointment theAppt) { //alfred 07.11.2022: perhaps we dont need this we can just use above method. kiv.
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteApptByApptId(int theApptId) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
				
		// delete appointment with appointment id
		Query theQuery = currentSession.createQuery("delete from Appointment where appt_id=:apptId");
		theQuery.setParameter("apptId", theApptId);
		theQuery.executeUpdate();

	}
	
	// to get the appointments based on doctorID
	@Override
	public List<Appointment> getApptsByDoctorId(int theDoctorId) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// get the appts for user id
		Criteria criteria = currentSession.createCriteria(Appointment.class);
		List<Appointment> docAppts = criteria.add(Restrictions.eqOrIsNull("doctor_id", theDoctorId)).list();
		
		return docAppts;
	}

	// to get the appointments based on date.
	@Override
	public List<Appointment> getApptsByDate(Date theDate) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
				
		// get the appts based on date
		Criteria criteria = currentSession.createCriteria(Appointment.class);
		List<Appointment> theAppts = criteria.add(Restrictions.eqOrIsNull("date_visited", theDate)).list();
				
		return theAppts;
	}

	// to check for duplicated appointment.
	@Override
	public Appointment checkForDupAppt(Appointment theAppt) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date theDate;
		Appointment dupAppt;
		
		try {
			theDate = new SimpleDateFormat("yyyy-MM-dd").parse(formatter.format(theAppt.getDate_visited()));
			
			// get the appt based on appt
			Criteria criteria = currentSession.createCriteria(Appointment.class);
			criteria.add(Restrictions.eq("patient_id", theAppt.getPatient_id()));
			criteria.add(Restrictions.eq("doctor_id", theAppt.getDoctor_id()));
			criteria.add(Restrictions.eq("date_visited", theDate));
			criteria.add(Restrictions.eq("timeslot", theAppt.getTimeslot()));
			dupAppt = (Appointment) criteria.setMaxResults(1).uniqueResult();
			
			/*
			Appointment dupAppt = (Appointment) criteria
						.add(Restrictions.eq("patient_id", theAppt.getPatient_id()))
						.add(Restrictions.eq("doctor_id", theAppt.getDoctor_id()))
						.add(Restrictions.eq("date_visited", theAppt.getDate_visited()))
						.add(Restrictions.eq("timeslot", theAppt.getTimeslot()))
						.uniqueResult();
			*/
			
			// return the duplicated appointment.
			return dupAppt;
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return null; //not looking right. kiv.
	}
	
}
