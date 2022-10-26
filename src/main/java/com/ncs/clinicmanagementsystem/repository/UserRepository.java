package com.ncs.clinicmanagementsystem.repository;

import com.ncs.clinicmanagementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Integer> {
}
