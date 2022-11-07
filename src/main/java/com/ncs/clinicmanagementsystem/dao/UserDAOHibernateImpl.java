package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.ScrollableResults;
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
		Criteria criteria = currentSession.createCriteria(User.class);
		User theUser = (User) criteria.add(Restrictions.eq("email", theEmail)).uniqueResult();
		
		return theUser;
	}

	
	@Override
	public void save(User theUser) {
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		
		// Save user.
		currentSession.saveOrUpdate(theUser);
		
		
		/* checking where to park validation logic... maybe should park at RestController.
		// Check if email already exist.
		ScrollableResults res = currentSession.createCriteria(User.class).add(Restrictions.eq("email", theUser.getEmail())).scroll();
		if (res.next()) { // Returns -1 if email exist.
			return -1;
		}
		else { // Save user. Returns 1 for successfully adding a new user.
			currentSession.saveOrUpdate(theUser);
			return 1;
		}
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
