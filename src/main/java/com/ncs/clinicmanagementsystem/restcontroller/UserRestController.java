package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
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
	
	// expose "/user" and return list of users
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
		
		// check if email already exist.
		User tempUser = userService.findByEmail(theUser.getEmail());
		
		if (tempUser != null) { // Throw exception if email already exist.
			throw new RuntimeException("This email address has already been registered.");
		}
		
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
	@DeleteMapping("user/delete")
	public void delete(@RequestBody User theUser) {
		System.out.println("hello =)");
		userService.deleteByEmail(theUser.getEmail());
	}
	
	
	
}
