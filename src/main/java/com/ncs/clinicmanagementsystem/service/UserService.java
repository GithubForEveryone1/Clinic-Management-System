package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.User;

public interface UserService {

	public List<User> findAll();
	
	public User findByEmail(String theEmail);
	
	public User findById(int theUserId);
	
	public void save(User theUser);
	
	public void update(User theUser);
	
	public void deleteByEmail(String theEmail);
	
	public List<User> findDoctors();
	
	public List<User> findPatients();
	
}
