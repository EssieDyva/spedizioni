package com.spedizioni.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Articolo implements Serializable {
    private Long idArticolo;
    private String codice;
    private String descrizione;
    private double peso;
}// end model