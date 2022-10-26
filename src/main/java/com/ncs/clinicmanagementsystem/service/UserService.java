package com.ncs.clinicmanagementsystem.service;

import com.ncs.clinicmanagementsystem.entity.User;
import com.ncs.clinicmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> list() {
        return userRepository.findAll();
    }

    public String addUser(User newUser) {
        // Check if user is duplicate
        // To-Do, I could not find the way to check with this JPA thing 👀 -Remus
        boolean userAlreadyExists = false;

        // SHA256 hashing
        MessageDigest md = null;

        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        byte[] digest = md.digest(newUser.getPassword().getBytes(StandardCharsets.UTF_8));
        StringBuffer sb = new StringBuffer();

        for (byte b: digest) {
            sb.append(String.format("%02x",  b & 0xff));
        }

        newUser.setPassword(sb.toString());
        // End hashing

        if (!userAlreadyExists) {
            userRepository.save(newUser);
        }
        return "User created :)";
    }
}
