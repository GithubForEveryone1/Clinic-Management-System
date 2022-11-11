package com.ncs.clinicmanagementsystem.restcontroller;

import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
import com.ncs.clinicmanagementsystem.entity.Closing;
import com.ncs.clinicmanagementsystem.service.AppointmentService;
import com.ncs.clinicmanagementsystem.service.ClosingService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class ClosingRestController {

	private ClosingService closingService;
	
	private AppointmentService apptService;

	public ClosingRestController(ClosingService theClosingService, AppointmentService theApptService) {
		this.closingService = theClosingService;
		this.apptService = theApptService;
	}
	
	// add mapping for GET /closing
	@GetMapping("/closing")
	public List<Closing> findAll() {
		List<Closing> theClosings;
		
		try {
			theClosings = closingService.findAll();
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theClosings.isEmpty()) { //throws error msg if appts list is empty.
			throw new RuntimeException("Opps something happened. Please try again.");
		}
		
		return theClosings;
	}
	
	// add mapping for GET /closing/{strDate}
	@GetMapping("/closing/{strDate}")
	public Closing getClosingByDate(@PathVariable String strDate) {
		
		Date theDate;
		Closing theClosing;
		
		try {
			theDate = new SimpleDateFormat("yyyy-MM-dd").parse(strDate);
			theClosing = closingService.getClosingByDate(theDate);
		}
		catch(Exception e) {
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (theClosing == null) { // throws error msg if user has no appointments.
			throw new RuntimeException("There is no closing for this date."); 
		}
		
		return theClosing;
		
	}
	
	// add mapping for POST /closing/create
	@PostMapping("/closing/create")
	public Closing createClosing(@RequestBody Closing theClosing) {
		
		// check if selected date has any appointments
		// check if selected date already has a closing
		
		List<Appointment> tempAppts;
		Closing tempClosing;
		
		//Date theDate = theClosing.getClosing_date();
		//String strDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(theDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
		
		try {
			tempAppts = apptService.getApptsByDate(theClosing.getClosing_date());
			tempClosing = closingService.getClosingByDate(theClosing.getClosing_date());
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
		}
		
		if (!tempAppts.isEmpty() ) {
			throw new RuntimeException("Denied. There are appointments on this date."); //throws error msg if there are appointments on this date.
		}
		else if (tempClosing != null) {
			throw new RuntimeException("This closing date already exist."); //throws error msg if this is already a closing date.
		}
		
		try {
			closingService.createClosing(theClosing);
		}
		catch(Exception e) {
			//throw new RuntimeException("Opps something happened. Please try again."); //throws error msg if error from db.
			throw new RuntimeException("error on saving new appt to db."); //test...
		}
		
		return theClosing;
	}
	
	// edit closing peding... kiv.
	
	// add mapping for DELETE /closing/delete
	@DeleteMapping("/closing/delete")
	public void deleteClosing(@RequestBody Closing theClosing) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date theDate;
		
		try {
			theDate = new SimpleDateFormat("yyyy-MM-dd").parse(formatter.format(theClosing.getClosing_date()));
			closingService.deleteClosingByDate(theDate); 
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Opps something happened. Please try again.");
		}
	}
	
}
