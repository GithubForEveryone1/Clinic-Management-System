/*

package com.ncs.clinicmanagementsystem.controller;

import java.util.List;

import com.ncs.clinicmanagementsystem.entity.User;
import com.ncs.clinicmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public List<User> getUsers() {
        return userService.list();
    }

    @PostMapping("/user/create")
    public String newUser(@RequestBody User newUser) {
        return userService.addUser(newUser);
    }

}

*/