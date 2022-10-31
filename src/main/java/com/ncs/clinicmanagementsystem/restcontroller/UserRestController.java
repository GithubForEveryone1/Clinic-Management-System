package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.ncs.clinicmanagementsystem.entity.User;
import com.ncs.clinicmanagementsystem.service.UserService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class UserRestController {

	private UserService userService;
	

	@Autowired
	public UserRestController(UserService theUserService) {
		userService = theUserService;
	}
	
	// expose "/employees" and return list of employees
	@GetMapping("/user")
	public List<User> findAll() {
		return userService.findAll();
	}
	
	// add mapping for GET /users/{userEmail}
	@GetMapping("/user/{userEmail}")
	public User getUser(@PathVariable String userEmail) {
		
		User theUser = userService.findByEmail(userEmail);
		
		if (theUser == null) {
			throw new RuntimeException("User email not found - " + userEmail);
		}
		
		return theUser;
	}
	
	// add mapping for POST /users - add new user
	@PostMapping("/user/create")
	public User addUser(@RequestBody User theUser) {
		
		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update
		
		//theUser.setUser_id(0); //this is to force id to 0 if somehow id was given to preventing updating of record.

		// Salty password
		theUser.setPassword(BCrypt.hashpw(theUser.getPassword(), BCrypt.gensalt()));
		userService.save(theUser);
		
		return theUser;
	}

	// add mapping for POST /users/login - user login
	@PostMapping("/user/login")
	public User login(@RequestBody User theUser) {
		String userEmail = theUser.getEmail();
		String userPassword = theUser.getPassword();

		User tempUser = userService.findByEmail(userEmail);
		System.out.println(tempUser);

		// If email does not exist in DB
		if (tempUser == null) {
			System.out.println("User not found");
			return null;
		}

		boolean emailMatch;
		boolean passwordMatch;

		// Check if pw matches hash thingy
		passwordMatch = BCrypt.checkpw(userPassword, tempUser.getPassword()) ? true : false;

		// Check if email exists
		emailMatch = tempUser.getEmail().equals(userEmail) ? true : false;

		if (emailMatch && passwordMatch) {
			System.out.println("Email and password matched");
			return tempUser;
		} else {
			tempUser.setPassword("");
			System.out.println("Wrong password");
			return tempUser;
		}

	}
	
}
