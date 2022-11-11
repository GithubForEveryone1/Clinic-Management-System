package com.ncs.clinicmanagementsystem.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncs.clinicmanagementsystem.dao.ClosingDAO;
import com.ncs.clinicmanagementsystem.entity.Closing;

@Service
public class ClosingServiceImpl implements ClosingService {

	private ClosingDAO closingDAO;
	
	@Autowired
	public ClosingServiceImpl(ClosingDAO closingDAO) {
		this.closingDAO = closingDAO;
	}
	
	@Override
	@Transactional
	public List<Closing> findAll() {
		return closingDAO.findAll();
	}

	@Override
	@Transactional
	public Closing getClosingByDate(Date date) {
		return closingDAO.getClosingByDate(date);
	}

	@Override
	@Transactional
	public void createClosing(Closing theClosing) {
		closingDAO.createClosing(theClosing);

	}

	@Override
	@Transactional
	public void editClosing(Closing theClosing) {
		closingDAO.editClosing(theClosing);

	}

	@Override
	@Transactional
	public void deleteClosingByDate(Date date) {
		closingDAO.deleteClosingByDate(date);

	}

}
