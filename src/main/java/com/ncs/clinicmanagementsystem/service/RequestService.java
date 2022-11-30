package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Request;

public interface RequestService {
	
	public List<Request> findAll();
	
	public void save(Request req);

	public void approveRequest(Request req);

}
