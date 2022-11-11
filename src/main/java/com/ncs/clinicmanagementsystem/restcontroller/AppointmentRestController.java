package com.ncs.clinicmanagementsystem.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theAppts.isEmpty()) { //throws error msg if appts list is empty.
			throw new RuntimeException("Opps something happened. Please try again.");
		}
		
		return theAppts;
	}
	
	// add mapping for GET /appt/{userId}
	// for patients appts
	@GetMapping("/appt/{userId}")
	public List<Appointment> getApptsByUserId(@PathVariable int userId) {
		List<Appointment> theAppts;
		
		try {
			theAppts = apptService.getApptsByUserId(userId);
			System.out.println(theAppts);
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
	
	// add mapping for POST /appt/edit
	@PostMapping("/appt/edit")
	public Appointment editAppt(@RequestBody Appointment theAppt) {
		
		// what are the fields that will be edited? perhaps it is better to split into individual methods. kiv..
		// - patient reschedules to change doctor, date, timeslot
		// - doctor updates diagnosis
		// - doctor updates prescriptions

		return theAppt;
		
	}
	
	// add mapping for DELETE /appt/delete
	@DeleteMapping("/appt/delete")
	public void deleteAppt(@RequestBody Appointment theAppt) {
		try {
			apptService.deleteApptByApptId(theAppt.getAppt_id());
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again.");
		}
	}
	
	// add mapping for GET /appt/{userId}
	// for doctors appt
	@GetMapping("/appt/{userId}")
	public List<Appointment> getApptsByDoctorId(@PathVariable int userId) {
		List<Appointment> docAppts;
			
		try {
			docAppts = apptService.getApptsByDoctorId(userId);
			System.out.println(docAppts);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
			
		if (docAppts.isEmpty()) { // throws error msg if user has no appointments.
			throw new RuntimeException("You have no appointments."); 
		}
			
		return docAppts;
	}
	
}
