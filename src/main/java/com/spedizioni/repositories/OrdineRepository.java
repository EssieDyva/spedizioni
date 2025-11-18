package com.spedizioni.repositories;

import com.spedizioni.constants.DBConfig;
import com.spedizioni.models.Ordine;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrdineRepository {

    public static List<Ordine> getAllOrdini() throws SQLException {
        List<Ordine> listaOrdini = new ArrayList<>();
        Connection conn = null;
        PreparedStatement comando = null;
        try {
            conn = DriverManager.getConnection(DBConfig.URL, DBConfig.USER, DBConfig.PPW);
            String query = "SELECT * FROM ordine";
            comando = conn.prepareStatement(query);
            ResultSet rs = comando.executeQuery();
            while (rs.next()) {
                Ordine ordine = new Ordine(
                        rs.getLong("ID_ORDINE"),
                        rs.getInt("NUMERO"),
                        rs.getString("DATA_ORDINE"));
                listaOrdini.add(ordine);
            }// end while
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            if (conn != null)
                conn.close();
            if (comando != null)
                comando.close();
        }
        return listaOrdini;
    }//end function
}//end repository