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
}// end repository