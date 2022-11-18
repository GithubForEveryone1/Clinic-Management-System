package com.ncs.clinicmanagementsystem.service;

import com.ncs.clinicmanagementsystem.dao.IllnessDAO;
import com.ncs.clinicmanagementsystem.entity.Illness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class IllnessServiceImpl implements IllnessService {

	private IllnessDAO illnessDAO;

	@Autowired
	public IllnessServiceImpl(IllnessDAO illnessDAO) {
		this.illnessDAO = illnessDAO;
	}
	
	@Override
	@Transactional
	public List<Illness> findAll() {
		return illnessDAO.findAll();
	}

	@Override
	@Transactional
	public void addIllness(Illness theIllness) {
		illnessDAO.addIllness(theIllness);

	}

	@Override
	@Transactional
	public void deleteIllness(Illness theIllness) {
		illnessDAO.deleteIllness(theIllness);

	}

}
