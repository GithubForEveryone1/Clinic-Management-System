package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.clinicmanagementsystem.entity.User;
import com.ncs.clinicmanagementsystem.service.UserService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserRestController {

	private UserService userService;
	

	@Autowired
	public UserRestController(UserService theUserService) {
		userService = theUserService;
	}
	
	// expose "/users" and return list of users
	@GetMapping("/users")
	public List<User> findAll() {
		return userService.findAll();
	}
	
	// add mapping for GET /users/{userEmail}
	@GetMapping("/users/{userEmail}")
	public User getUser(@PathVariable String userEmail) {
		
		User theUser = userService.findByEmail(userEmail);
		
		if (theUser == null) {
			throw new RuntimeException("User email not found - " + userEmail);
		}
		
		return theUser;
	}
	
	// add mapping for POST /users - add new user
	@PostMapping("/users")
	public User addUser(@RequestBody User theUser) {
		
		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update
		
		//theUser.setUser_id(0); //this is to force id to 0 if somehow id was given to preventing updating of record.
		userService.save(theUser);
		
		return theUser;
	}

	// add mapping for POST /users/login - user login
	@PostMapping("/users/login")
	public User login(@RequestBody User theUser) {
		
		String userEmail = theUser.getEmail();
		String userpassword = theUser.getPassword();
		
		User tempUser = userService.findByEmail(userEmail);
		
		if (tempUser.getEmail().equals(userEmail) && tempUser.getPassword().equals(userpassword)) {
			//return "You have successfully logged in.";
			return tempUser;
		}
		
		//return "You have not successfully logged in.";
		return null;
		
	}
	
	
	
	
}
