package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import javax.persistence.EntityManager;

import javax.persistence.criteria.CriteriaQuery;

import org.hibernate.Criteria;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.clinicmanagementsystem.entity.Appointment;
import com.ncs.clinicmanagementsystem.entity.User;

@Repository
public class UserDAOHibernateImpl implements UserDAO {

	// define field for entitymanager
	private EntityManager entityManager;

	// set up constructor injection
	@Autowired
	public UserDAOHibernateImpl(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	// @Transactional
	public List<User> findAll() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// create a query
		Query<User> theQuery = currentSession.createQuery("from User", User.class);

		// execute query and get result list
		List<User> users = theQuery.getResultList();

		// return the results
		return users;
	}

	@Override
	public User findByEmail(String theEmail) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// get the user
		Criteria criteria = currentSession.createCriteria(User.class);
		User theUser = (User) criteria.add(Restrictions.eq("email", theEmail)).uniqueResult();

		return theUser;
	}

	@Override
	public User findById(int theUserId) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// get the user
		Criteria criteria = currentSession.createCriteria(User.class);
		User theUser = (User) criteria.add(Restrictions.eq("user_id", theUserId)).uniqueResult();

		return theUser;
	}

	@Override
	public List<User> findDoctors() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// get the doctors
		Criteria criteria = currentSession.createCriteria(User.class);
		List<User> theDoctors = criteria.add(Restrictions.eq("account_type", "doctor")).list();

		return theDoctors;
	}

	@Override
	public List<User> findPatients() {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// get the patients
		Criteria criteria = currentSession.createCriteria(User.class);
		List<User> thePatients = criteria.add(Restrictions.eq("account_type", "patient")).list();

		return thePatients;
	}

	@Override
	public void updateUser(User theUser) {
		Session currentSession = entityManager.unwrap(Session.class);
//		theUser.setFirst_name(theUser.getFirst_name());
//		theUser.setFirst_name(theUser.getFirst_name());
//		theUser.setFirst_name(theUser.getFirst_name());
		System.out.println(theUser.getUser_id());
		System.out.println(theUser.getFirst_name());
		User existingUser = currentSession.find(User.class, theUser.getUser_id());

		// Only get ID, diagnosis and prescription from input, other fields will not update and will retrieve from existing appt
		System.out.println("before set");
		existingUser.setFirst_name(theUser.getFirst_name());
//		existingUser.setLast_name(theUser.getLast_name());
//		existingUser.setEmail(theUser.getEmail());
		
//		Query theQuery = currentSession.createQuery(
//				"update user set first_name =:userFirstName, last_name =:userLastName, email=:userEmail where email=:currentEmail");
//		theQuery.setParameter("userFirstName", theUser.getFirst_name());
//		theQuery.setParameter("userLastName", theUser.getLast_name());
//		theQuery.setParameter("userEmail", theUser.getEmail());
//		theQuery.setParameter("currentEmail", currentEmail);
//		theQuery.executeUpdate();
		currentSession.update(existingUser);
		System.out.println("at the end");
	}

	@Override
	public void save(User theUser) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// Save user.
		currentSession.saveOrUpdate(theUser);

		/*
		 * checking where to park validation logic... maybe should park at
		 * RestController. // Check if email already exist. ScrollableResults res =
		 * currentSession.createCriteria(User.class).add(Restrictions.eq("email",
		 * theUser.getEmail())).scroll(); if (res.next()) { // Returns -1 if email
		 * exist. return -1; } else { // Save user. Returns 1 for successfully adding a
		 * new user. currentSession.saveOrUpdate(theUser); return 1; }
		 */
	}

	@Override
	public void deleteByEmail(String theEmail) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// delete user with email address
		Query theQuery = currentSession.createQuery("delete from User where email=:userEmail");
		theQuery.setParameter("userEmail", theEmail);
		theQuery.executeUpdate();

	}

}
