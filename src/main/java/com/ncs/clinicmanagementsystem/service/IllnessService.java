package com.ncs.clinicmanagementsystem.service;

import com.ncs.clinicmanagementsystem.entity.Closing;
import com.ncs.clinicmanagementsystem.entity.Illness;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface IllnessService {

	public List<Illness> findAll();

	public void addIllness(Illness theIllness);

	@Transactional
	void deleteIllness(Illness theIllness);
}
