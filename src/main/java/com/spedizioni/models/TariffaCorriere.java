package com.spedizioni.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TariffaCorriere implements Serializable {
    private Long idTariffaCorriere;
    private String nomeCorriere;
    private String nomeTariffa;
    private float pesoMassimo;
    private double costo;
}// end model