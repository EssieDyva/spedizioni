package com.spedizioni.controllers;

import com.spedizioni.models.Articolo;
import com.spedizioni.repositories.ArticoloRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/articoli")
public class ArticoloController {

    @GetMapping("/all")
    public List<Articolo> getAllArticoli() throws SQLException {
        return ArticoloRepository.getAllArticoli();
    }// end function
}// end controller