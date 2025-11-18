package com.spedizioni.controllers;

import com.spedizioni.models.Ordine;
import com.spedizioni.repositories.OrdineRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ordini")
public class OrdineController {

    @GetMapping("/all")
    public static List<Ordine> getAllOrdini() throws SQLException {
        return OrdineRepository.getAllOrdini();
    }// end function
}// end controller