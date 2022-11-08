package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.clinicmanagementsystem.entity.Appointment;
import com.ncs.clinicmanagementsystem.entity.User;
import com.ncs.clinicmanagementsystem.service.AppointmentService;
import com.ncs.clinicmanagementsystem.service.UserService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class AppointmentRestController {

	private AppointmentService apptService;
	
	private UserService userService;

	public AppointmentRestController(AppointmentService theApptService, UserService theUserService) {
		this.userService = theUserService;
		this.apptService = theApptService;
	}
	
	// add mapping for GET /appt
	@GetMapping("/appt")
	public List<Appointment> findAll() {
		List<Appointment> theAppts;
		
		try {
			theAppts = apptService.findAll();
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theAppts.isEmpty()) { //throws error msg if appts list is empty.
			throw new RuntimeException("Opps something happened. Please try again.");
		}
		
		return theAppts;
	}
	
	// add mapping for GET /appt/{userId}
	@GetMapping("/appt/{userId}")
	public List<Appointment> getApptsByUserId(@PathVariable int userId) {
		List<Appointment> theAppts;
		
		try {
			theAppts = apptService.getApptsByUserId(userId);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theAppts.isEmpty()) { // throws error msg if user has no appointments.
			throw new RuntimeException("You have no appointments."); 
		}
		
		return theAppts;
	}
	
	// add mapping for POST /appt/create
	@PostMapping("/appt/create")
	public Appointment createAppt(@RequestBody Appointment theAppt) {
		
		// check if doctor's available timeslots taken not in place. kiv.
		
		// check if patient and doctor id is valid
		User tempPatient;
		User tempDoctor;
		
		try {
			tempPatient = userService.findById(theAppt.getPatient_id());
			tempDoctor = userService.findById(theAppt.getDoctor_id());
			System.out.println(tempPatient);
			System.out.println(tempDoctor);
		}
		catch(Exception e) {
			//throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
			e.printStackTrace(); //test...
			throw new RuntimeException("error on retrieving tempPatient or tempDoctor"); //test...

		}
		
		if (tempPatient == null || tempDoctor == null) {
			//throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if user or doctor id not found.
			throw new RuntimeException("tempPatient or tempDoctor is null"); //test...
		}
		else if (!tempPatient.getAccount_type().equals("patient") || !tempDoctor.getAccount_type().equals("doctor")) {
			//throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if patient is not patient or doctor is not doctor.
			throw new RuntimeException("tempPatient or tempDoctor is not account type patient or doctor."); //test...
		}
		
		// save new appt to db.
		try {
			apptService.createApptByUserId(theAppt);
		}
		catch(Exception e) {
			//throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
			throw new RuntimeException("error on saving new appt to db."); //test...
		}
		
		return theAppt;
	}
	
	
}