package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.User;

public interface UserDAO {

	public List<User> findAll();
	
	public User findByEmail(String theEmail);
	
	public User findById(int theUserId);
	
	public void save(User theUser);
	
	public void deleteByEmail(String theEmail);

	public List<User> findDoctors();
	
}
