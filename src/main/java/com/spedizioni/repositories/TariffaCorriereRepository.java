package com.spedizioni.repositories;

import com.spedizioni.constants.DBConfig;
import com.spedizioni.models.TariffaCorriere;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TariffaCorriereRepository {

    public static List<TariffaCorriere> getAllTariffeCorrieri() throws SQLException {
        List<TariffaCorriere> listaTariffeCorrieri = new ArrayList<>();
        Connection conn = null;
        PreparedStatement comando = null;
        try {
            conn = DriverManager.getConnection(DBConfig.URL, DBConfig.USER, DBConfig.PPW);
            String query = "SELECT * FROM tariffa_corriere";
            comando = conn.prepareStatement(query);
            ResultSet rs = comando.executeQuery();
            while (rs.next()) {
                TariffaCorriere tariffaCorriere = new TariffaCorriere(
                        rs.getLong("ID_TARIFFA_CORRIERE"),
                        rs.getString("NOME_CORRIERE"),
                        rs.getString("NOME_TARIFFA"),
                        rs.getFloat("PESO_MASSIMO"),
                        rs.getDouble("COSTO"));
                listaTariffeCorrieri.add(tariffaCorriere);
            }// end while
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            if (conn != null)
                conn.close();
            if (comando != null)
                comando.close();
        }
        return listaTariffeCorrieri;
    }//end function

    public static TariffaCorriere addTariffaCorriere(TariffaCorriere tariffaCorriere) throws SQLException {
        Connection conn = null;
        PreparedStatement comando = null;
        int righeInserite = 0;
        try {
            conn = DriverManager.getConnection(DBConfig.URL, DBConfig.USER, DBConfig.PPW);
            String query = "INSERT INTO tariffa_corriere (NOME_CORRIERE, NOME_TARIFFA, PESO_MASSIMO, COSTO) " +
                            "VALUES (?, ?, ?, ?)";
            comando = conn.prepareStatement(query);
            // per motivi a me sconosciuti, è come se i dati non arrivassero, anche usando postman
            comando.setString(1, tariffaCorriere.getNomeCorriere());
            comando.setString(2, tariffaCorriere.getNomeTariffa());
            comando.setFloat(3, tariffaCorriere.getPesoMassimo());
            comando.setDouble(4, tariffaCorriere.getCosto());
            righeInserite = comando.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            if(conn != null)
                conn.close();
            if(comando != null)
                comando.close();
        }
        return righeInserite > 0 ? tariffaCorriere : null; // Return the added book or null if insertion failed
    }// end function

    public static boolean deleteTariffaCorriere(Long id) throws SQLException {
        Connection conn = null;
        PreparedStatement comando = null;
        int righeCancellate = 0;
        try {
            conn = DriverManager.getConnection(DBConfig.URL, DBConfig.USER, DBConfig.PPW);
            String query = "DELETE FROM tariffa_corriere WHERE id = ?";
            comando = conn.prepareStatement(query);
            comando.setLong(1, id);
            righeCancellate = comando.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            if(conn != null)
                conn.close();
            if(comando != null)
                comando.close();
        }
        return righeCancellate > 0; // Return true if deletion was successful
    }// end function
}// end repository