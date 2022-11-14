package com.ncs.clinicmanagementsystem.dao;

import java.util.Date;
import java.util.List;

import com.ncs.clinicmanagementsystem.entity.Closing;

public interface ClosingDAO {

	public List<Closing> findAll();
	
	public Closing getClosingByDate(Date date);
	
	public void createClosing(Closing theClosing);
	
	public void editClosing(Closing theClosing);
	
	public void deleteClosingByDate(Date date);
	
}
