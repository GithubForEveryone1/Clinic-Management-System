package com.ncs.clinicmanagementsystem.restcontroller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	// expose "/user" and return list of users
	@GetMapping("/user")
	public List<User> findAll() {
		
		List<User> theUsers;
		
		try {
			theUsers = userService.findAll();
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theUsers.isEmpty()) { //throws error msg if users list is empty.
			throw new RuntimeException("Opps something happened. Please try again.");
		}
		
		return theUsers;
	}
	
	// add mapping for GET /user/doctors
	@GetMapping("/user/doctors")
	public List<User> findDoctors() {
		List<User> theDoctors;
		
		try {
			theDoctors = userService.findDoctors();
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theDoctors.isEmpty()) { //throws error msg if doctors list is empty.
			throw new RuntimeException("Opps something happened. Please try again.");
		}
		
		return theDoctors;
		
	}
	
	// add mapping for GET /user/{userEmail}
	@GetMapping("/user/{userEmail}")
	public User getUser(@PathVariable String userEmail) {
		
		User theUser;
		
		try {
			theUser = userService.findByEmail(userEmail);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theUser == null) { //throws error msg if user does not exist.
			throw new RuntimeException("User email not found - " + userEmail); 
		}
		
		return theUser;
	}
	
	// add mapping for POST /user - add new user
	@PostMapping("/user/create")
	public User addUser(@RequestBody User theUser) {
		
		// check if email already exist.
		User tempUser;
		try {
			tempUser = userService.findByEmail(theUser.getEmail());
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (tempUser != null) { // Throw exception if email already exist.
			throw new RuntimeException("This email address has already been registered.");
		}
		
		// Salty password
		theUser.setPassword(BCrypt.hashpw(theUser.getPassword(), BCrypt.gensalt()));
			
		// save new user to db.
		try {
			userService.save(theUser);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		return theUser;
	}

	// add mapping for POST /user/login - user login
	@PostMapping("/user/login")
	public User login(@RequestBody User theUser) {
		String userEmail = theUser.getEmail();
		String userPassword = theUser.getPassword();

		User tempUser;
		
		try {
			tempUser = userService.findByEmail(userEmail);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		System.out.println(tempUser);

		// If email does not exist in DB
		if (tempUser == null) {
			System.out.println("User not found");
			
			//throw new ResponseStatusException(HttpStatus.CONFLICT, "Email does not exist");
			throw new RuntimeException("Email does not exist.");
			//return null;
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
			throw new RuntimeException("Email or password does not match.");
			//return null;
		}
	}


	// This mapping is temporary just to delete emails by giving the front-end an email address
	// add mapping for DELETE /user/delete - delete a user
	@DeleteMapping("user/delete")
	public void delete(@RequestBody User theUser) {
		
		try {
			userService.deleteByEmail(theUser.getEmail());
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again.");
		}
		
	}
	
}
