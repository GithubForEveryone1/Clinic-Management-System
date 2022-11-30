package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ncs.clinicmanagementsystem.entity.Inventory;
import com.ncs.clinicmanagementsystem.entity.Request;
import com.ncs.clinicmanagementsystem.entity.User;

@Repository
public class RequestDAOHibernateImpl implements RequestDAO{
		// define field for entitymanager
		private EntityManager entityManager;

		// set up constructor injection
		@Autowired
		public RequestDAOHibernateImpl(EntityManager theEntityManager) {
			entityManager = theEntityManager;
		}

		@Override
		// @Transactional
		public List<Request> findAll() {
			// get the current hibernate session
			Session currentSession = entityManager.unwrap(Session.class);

			// create a query
			Query<Request> theQuery = currentSession.createQuery("from Request", Request.class);

			// execute query and get result list
			List<Request> requests = theQuery.getResultList();

			// return the results
			return requests;
		}
		
		@Override
		public void save(Request req) {
			// get the current hibernate session
			Session currentSession = entityManager.unwrap(Session.class);

			// Save request.
			currentSession.saveOrUpdate(req);
		}

		@Override
		public void approveRequest(Request req) {
			// get the current hibernate session
			Session currentSession = entityManager.unwrap(Session.class);
			
			Request existingRequest = currentSession.find(Request.class, req.getRequest_id());
			
			// change the status to approve
			existingRequest.setStatus("approved");
			
			// update the request
			currentSession.update(existingRequest);
		}
}
