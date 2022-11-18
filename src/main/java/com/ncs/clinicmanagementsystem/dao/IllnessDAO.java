package com.ncs.clinicmanagementsystem.dao;

import com.ncs.clinicmanagementsystem.entity.Closing;
import com.ncs.clinicmanagementsystem.entity.Illness;

import java.util.Date;
import java.util.List;

public interface IllnessDAO {

	public List<Illness> findAll();

	public void addIllness(Illness theIllness);

	public void deleteIllness(Illness theIllness);
	
}
