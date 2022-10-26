package com.ncs.clinicmanagementsystem.repository;

import com.ncs.clinicmanagementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
