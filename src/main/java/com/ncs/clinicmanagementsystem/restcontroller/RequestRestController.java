package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.clinicmanagementsystem.entity.Request;
import com.ncs.clinicmanagementsystem.entity.User;
import com.ncs.clinicmanagementsystem.service.RequestService;
import com.ncs.clinicmanagementsystem.service.UserService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class RequestRestController {
	
	private RequestService requestService;
	
	@Autowired
	public RequestRestController(RequestService theRequestService) {
		requestService = theRequestService;
	}

	
	// add mapping for POST /request - add new request
	@PostMapping("/request/create")
	public Request addRequest(@RequestBody Request req) {

		// save new user to db.
		try {
			requestService.save(req);
		} catch (Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); // throws error msg if error from
																						// db.
		}

		return req;
	}
	// display all requests 
	@GetMapping("/requests")
	public List<Request> findAll() {

		List<Request> requests;

		try {
			requests = requestService.findAll();
		} catch (Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); // throws error msg if error from
																						// db.
		}

		if (requests.isEmpty()) { // throws error msg if users list is empty.
			throw new RuntimeException("Opps something happened. Please try again.");
		}

		return requests;
	}
	
	// change status from pending to approve
	@PostMapping("/request/approve")
	public Request approveRequest(@RequestBody Request req) {
		System.out.println(req);
		try {
			requestService.approveRequest(req);
			
		}
		catch(Exception e) {
			throw new RuntimeException("Could not update request due to unknown error :(");
		}
		return req;
		
	}
	
}
