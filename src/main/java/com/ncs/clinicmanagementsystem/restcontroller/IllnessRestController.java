package com.ncs.clinicmanagementsystem.restcontroller;

import com.ncs.clinicmanagementsystem.entity.Appointment;
import com.ncs.clinicmanagementsystem.entity.Closing;
import com.ncs.clinicmanagementsystem.entity.Illness;
import com.ncs.clinicmanagementsystem.service.AppointmentService;
import com.ncs.clinicmanagementsystem.service.ClosingService;
import com.ncs.clinicmanagementsystem.service.IllnessService;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class IllnessRestController {

	private IllnessService illnessService;

	private AppointmentService apptService;

	public IllnessRestController(IllnessService theIllnessService) {
		this.illnessService = theIllnessService;
	}
	
	// add mapping for GET /closing
	@GetMapping("/illness")
	public List<Illness> findAll() {
		List<Illness> theIllnesses;
		
		try {
			theIllnesses = illnessService.findAll();
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException("You broke something, please check what you're doing");
		}
		
		if (theIllnesses.isEmpty()) {
			throw new RuntimeException("No illnesses found, that's weird!");
		}
		
		return theIllnesses;
	}

	@PostMapping("/illness/add")
	public String addIllness(@RequestBody Illness theIllness) {
		
		// check if illness already exists
		// and not empty
		try {
			if (theIllness.getName() == "") {
				throw new RuntimeException("Illness cannot NOT have a name you dummy");
			}
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}

		try {
			illnessService.addIllness(theIllness);
		}
		catch(Exception e) {
			throw new RuntimeException("This illness probably already exists, bro (or sis)");
		}

		return theIllness.getName() + " added!";
	}

	@DeleteMapping("/illness/delete")
	public String deleteIllness(@RequestBody Illness theIllness) {
		try {
			illnessService.deleteIllness(theIllness);
		}
		catch(Exception e) {
			throw new RuntimeException("This illness probably doesn't exist, bro (or sis)");
		}

		return theIllness.getName() + " has been deleted!";
	}
	
}
