package com.ncs.clinicmanagementsystem.dao;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Request;

public interface RequestDAO {
	
	public List<Request> findAll();
	
	public void save(Request req);

	public void approveRequest(Request req);

}
