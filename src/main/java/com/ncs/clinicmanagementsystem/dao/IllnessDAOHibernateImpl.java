package com.ncs.clinicmanagementsystem.dao;

import com.ncs.clinicmanagementsystem.entity.Appointment;
import com.ncs.clinicmanagementsystem.entity.Closing;
import com.ncs.clinicmanagementsystem.entity.Illness;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Repository
public class IllnessDAOHibernateImpl implements IllnessDAO {

	private EntityManager entityManager;

	@Autowired
	public IllnessDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Illness> findAll() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// create a query
		Query<Illness> theQuery = currentSession.createQuery("from Illness", Illness.class);

		// execute query and get result list
		List<Illness> illnesses = theQuery.getResultList();

		return illnesses;
	}

	@Override
	public void addIllness(Illness theIllness) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		currentSession.save(theIllness);
	}

	@Override
	public void deleteIllness(Illness theIllness) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);


		Illness existingIllness = currentSession.find(Illness.class, theIllness.getName());

		currentSession.delete(existingIllness);
	}
}