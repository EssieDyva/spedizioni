package com.spedizioni.repositories;

import com.spedizioni.constants.DBConfig;
import com.spedizioni.models.Articolo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ArticoloRepository {

    public static List<Articolo> getAllArticoli() throws SQLException {
        List<Articolo> listaArticoli = new ArrayList<>();
        Connection conn = null;
        PreparedStatement comando = null;
        try {
            conn = DriverManager.getConnection(DBConfig.URL, DBConfig.USER, DBConfig.PPW);
            String query = "SELECT * FROM articolo";
            comando = conn.prepareStatement(query);
            ResultSet rs = comando.executeQuery();
            while (rs.next()) {
                Articolo articolo = new Articolo(
                        rs.getLong("ID_ARTICOLO"),
                        rs.getString("CODICE"),
                        rs.getString("DESCRIZIONE"),
                        rs.getDouble("PESO"));
                listaArticoli.add(articolo);
            }// end while
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            if (conn != null)
                conn.close();
            if (comando != null)
                comando.close();
        }
        return listaArticoli;
    }// end function
}// end repository