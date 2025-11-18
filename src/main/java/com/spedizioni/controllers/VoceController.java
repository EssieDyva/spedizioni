package com.spedizioni.controllers;

import com.spedizioni.models.Voce;
import com.spedizioni.repositories.VoceRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/voci")
public class VoceController {

    @GetMapping("/all")
    public List<Voce> getAllVoci() throws SQLException {
        return VoceRepository.getAllVoci();
    }// end function
}// end controller