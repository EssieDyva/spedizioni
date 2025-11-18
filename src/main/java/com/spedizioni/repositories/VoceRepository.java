package com.spedizioni.repositories;

import com.spedizioni.constants.DBConfig;
import com.spedizioni.models.Voce;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class VoceRepository {

    public static List<Voce> getAllVoci() throws SQLException {
        List<Voce> listaVoci = new ArrayList<>();
        Connection conn = null;
        PreparedStatement comando = null;
        try {
            conn = DriverManager.getConnection(DBConfig.URL, DBConfig.USER, DBConfig.PPW);
            String query = "SELECT * FROM tariffa_corriere";
            comando = conn.prepareStatement(query);
            ResultSet rs = comando.executeQuery();
            while (rs.next()) {
                Voce voce = new Voce(
                        rs.getLong("ID_VOCE"),
                        rs.getLong("ID_ORDINE"),
                        rs.getLong("ID_ARTICOLO"),
                        rs.getInt("QUANTITA"));
                listaVoci.add(voce);
            }// end while
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            if (conn != null)
                conn.close();
            if (comando != null)
                comando.close();
        }
        return listaVoci;
    }//end function
}// end repository