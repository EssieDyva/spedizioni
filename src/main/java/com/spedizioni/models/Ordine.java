package com.spedizioni.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ordine implements Serializable {
    private Long idOrdine;
    private int numero;
    private String data;
    private double costo;
    private String nomeCorriere;
    private String nomeTariffa;
}// end model