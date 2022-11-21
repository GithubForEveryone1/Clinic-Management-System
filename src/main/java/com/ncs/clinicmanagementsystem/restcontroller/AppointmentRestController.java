package com.ncs.clinicmanagementsystem.restcontroller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.*;

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
	
	// add mapping for GET /appt/getbydate/{strDate} //yyyy-mm-dd //for example "/appt/getbydate/2022-11-08"
	@GetMapping("/appt/getbydate/{strDate}")
	public List<Appointment> getApptsByDate(@PathVariable String strDate) {
//		System.out.println("this is the input from the mapping" + strDate);
		
		Date theDate;
		List<Appointment> theAppts;
		
		try {
			theDate = new SimpleDateFormat("yyyy-MM-dd").parse(strDate);
//			System.out.println("date to be passed to the service" + theDate);
			theAppts = apptService.getApptsByDate(theDate);
//			System.out.println(theAppts);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theAppts.isEmpty()) { // throws error msg if user has no appointments.
			throw new RuntimeException("You have no appointments."); 
		}
		
		return theAppts;
	}
	
	// add mapping for POST /appt/test //test for duplicates.
	@PostMapping("/appt/test")
	public Appointment testDup(@RequestBody Appointment theAppt) {
		System.out.println(theAppt);
		return apptService.checkForDupAppt(theAppt);
	}
	
	// add mapping for POST /appt/create
	@PostMapping("/appt/create")
	public Appointment createAppt(@RequestBody Appointment theAppt) {
		
		// check if doctor's available timeslots already taken.
		Appointment tempAppt;
		
		// check if patient and doctor id is valid
		User tempPatient;
		User tempDoctor;
		
		try {
			tempAppt = apptService.checkForDupAppt(theAppt);
			tempPatient = userService.findById(theAppt.getPatient_id());
			tempDoctor = userService.findById(theAppt.getDoctor_id());
			System.out.println(tempPatient);
			System.out.println(tempDoctor);
			System.out.println(tempAppt);
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
		else if (tempAppt != null) {
			throw new RuntimeException("This slot is no longer available. Please select another slot."); //throws error msg if patient is not patient or doctor is not doctor.
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
	@PutMapping("/appt/edit")
	public Appointment editAppt(@RequestBody Appointment theAppt) {
		// what are the fields that will be edited? perhaps it is better to split into individual methods. kiv..
		// - patient reschedules to change doctor, date, timeslot
		// - doctor updates diagnosis
		// - doctor updates prescriptions

		// Remus: I removed everything here for now since we're not using this yet
		return new Appointment();
	}
	@PutMapping("/appt/edit-diagnosis-and-prescription")
	public Appointment editApptDiagnosisAndPrescription(@RequestBody Appointment theAppt) {

		// what are the fields that will be edited? perhaps it is better to split into individual methods. kiv..
		// - patient reschedules to change doctor, date, timeslot
		// - doctor updates diagnosis
		// - doctor updates prescriptions

		try {
			apptService.editApptDiagnosisAndPrescription(theAppt);
		}
		catch(Exception e) {
			throw new RuntimeException("Could not update appointment due to unknown error :(");
		}

//		return "I don't know how to return a proper HTTP response, but you successfully updated the appointment :)";
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
	@GetMapping("/docAppt/{userId}")
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
