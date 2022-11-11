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
import com.ncs.clinicmanagementsystem.entity.Closing;

@Repository
public class ClosingDAOHibernateImpl implements ClosingDAO {

	// define field for entitymanager
	private EntityManager entityManager;
		
	// set up constructor injection
	@Autowired
	public ClosingDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	
	@Override
	public List<Closing> findAll() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
				
		// create a query
		Query<Closing> theQuery = currentSession.createQuery("from Closing", Closing.class);
		
		// execute query and get result list
		List<Closing> closings = theQuery.getResultList();
				
		// return the results
		return closings;
	}

	@Override
	public Closing getClosingByDate(Date date) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
				
		// get the closing by date
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date theDate;
		Closing theClosing;
		
		try {
			theDate = new SimpleDateFormat("yyyy-MM-dd").parse(formatter.format(date));
			Criteria criteria = currentSession.createCriteria(Closing.class);
			theClosing = (Closing) criteria.add(Restrictions.eq("closing_date", theDate)).uniqueResult();
			
			return theClosing;
		}
		catch (ParseException e) {
			e.printStackTrace();
		}
		
		return null; //not looking right. kiv.
	}

	@Override
	public void createClosing(Closing theClosing) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
						
		// Save closing.
		currentSession.save(theClosing);

	}

	@Override
	public void editClosing(Closing theClosing) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
								
		// Update closing.
		currentSession.update(theClosing);

	}

	@Override
	public void deleteClosingByDate(Date theDate) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
						
		// delete closing by date
		Query theQuery = currentSession.createQuery("delete from closing where closing_date=:closingDate");
		theQuery.setParameter("closingDate", theDate);
		theQuery.executeUpdate();

	}

}
