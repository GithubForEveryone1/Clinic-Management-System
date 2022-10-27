package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.User;

public interface UserService {

	public List<User> findAll();
	
	public User findByEmail(String theEmail);
	
	public void save(User theUser);
	
	public void deleteByEmail(String theEmail);
	
}
