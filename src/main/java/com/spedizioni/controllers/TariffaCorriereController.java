package com.spedizioni.controllers;

import com.spedizioni.models.TariffaCorriere;
import com.spedizioni.repositories.TariffaCorriereRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<TariffaCorriere> inserisciTariffa(@RequestBody TariffaCorriere tariffaCorriere) throws SQLException {
        TariffaCorriere nuovaTariffa = TariffaCorriereRepository.addTariffaCorriere(tariffaCorriere);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuovaTariffa);
    }// end function

    @DeleteMapping("/{id}")
    public void cancellaTariffa(Long id) throws SQLException {
        TariffaCorriereRepository.deleteTariffaCorriere(id);
    }
}// end controller