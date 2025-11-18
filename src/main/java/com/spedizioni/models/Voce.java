package com.spedizioni.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Voce implements Serializable {
    private Long idVoce;
    private Long idOrdine;
    private long idArticolo;
    private Integer quantita;
}// end model