package com.ncs.clinicmanagementsystem.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.clinicmanagementsystem.dao.UserDAO;
import com.ncs.clinicmanagementsystem.entity.User;

@Service
public class UserServiceImpl implements UserService {

	private UserDAO userDAO;
	
	@Autowired
	public UserServiceImpl(UserDAO theUserDAO) {
		userDAO = theUserDAO;
	}
	
	@Override
	@Transactional
	public List<User> findAll() {
		return userDAO.findAll();
	}

	@Override
	@Transactional
	public User findByEmail(String theEmail) {
		return userDAO.findByEmail(theEmail);
	}

	@Override
	@Transactional
	public User findById(int theUserId) {
		return userDAO.findById(theUserId);
	}
	
	@Override
	@Transactional
	public void save(User theUser) {
		 userDAO.save(theUser);

	}

	@Override
	@Transactional
	public void deleteByEmail(String theEmail) {
		userDAO.deleteByEmail(theEmail);

	}

	@Override
	@Transactional
	public List<User> findDoctors() {
		return userDAO.findDoctors();
	}
}
