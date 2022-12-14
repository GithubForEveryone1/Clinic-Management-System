package com.ncs.clinicmanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.clinicmanagementsystem.dao.RequestDAO;
import com.ncs.clinicmanagementsystem.dao.UserDAO;
import com.ncs.clinicmanagementsystem.entity.Request;
import com.ncs.clinicmanagementsystem.entity.User;

@Service
public class RequestServiceImpl implements RequestService{
	private RequestDAO reqDAO;
	
	@Autowired
	public RequestServiceImpl(RequestDAO theReqDAO) {
		this.reqDAO = theReqDAO;
	}

	@Override
	@Transactional
	public List<Request> findAll() {
		return reqDAO.findAll();
	}
	
	@Override
	@Transactional
	public void save(Request req) {
		reqDAO.save(req);

	}

	@Override
	@Transactional
	public void approveRequest(Request req) {
		reqDAO.approveRequest(req);
		
	}

	@Override
	@Transactional
	public void rejectRequest(Request req) {
		reqDAO.rejectRequest(req);
		
	}

	@Override
	@Transactional
	public List<Request> getRequestByNurseId(int nurseId) {
		return reqDAO.getRequestByNurseId(nurseId);
	}
}
