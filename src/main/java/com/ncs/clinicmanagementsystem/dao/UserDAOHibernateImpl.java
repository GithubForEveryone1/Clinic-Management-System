package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
	//@Transactional
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
		//User theUser = currentSession.get(User.class, theEmail); //only gets from the primary key id?
		//Query theQuery = currentSession.createQuery("SELECT user_id, first_name, last_name, email, address, contact_number, password, dob, gender, account_type, date_created FROM user WHERE email=:userEmail"); //not working... kiv..
		//theQuery.setParameter("userEmail", theEmail);
		//List<User> theUser = (List<User>) theQuery.uniqueResult();
		Criteria criteria = currentSession.createCriteria(User.class);
		User theUser = (User) criteria.add(Restrictions.eq("email", theEmail)).uniqueResult();
		
		//List<User> theUser = currentSession.createQuery("from user u where u.email=:theEmail").list();
		
		// return the user
		return theUser;
	}

	
	@Override
	public void save(User theUser) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
				
		// save user
		currentSession.saveOrUpdate(theUser); //need to check the pre-defined saving condition ...
	
	}

	
	@Override
	public void deleteByEmail(String theEmail) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// delete user with primary key???
		Query theQuery = currentSession.createQuery("delete from user where email=:userEmail");
		theQuery.setParameter("userEmail", theEmail);
		theQuery.executeUpdate();
		
	}

}
