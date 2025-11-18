package com.spedizioni.controllers;

import com.spedizioni.models.TariffaCorriere;
import com.spedizioni.repositories.TariffaCorriereRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tariffecorrieri")
public class TariffaCorriereController {

    @GetMapping("/all")
    public List<TariffaCorriere> getAllTariffeCorrieri() throws SQLException {
        return TariffaCorriereRepository.getAllTariffeCorrieri();
    }// end function
}// end controller