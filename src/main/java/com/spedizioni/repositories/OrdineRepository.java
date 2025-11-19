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
            String query =
                    "SELECT o.*, tc.COSTO, tc.NOME_CORRIERE, tc.NOME_TARIFFA\n" +
                    "FROM ordine o\n" +
                    "JOIN (\n" +
                    "    SELECT o2.ID_ORDINE AS ordine_id,\n" +
                    "        SUM(a.PESO * v.QUANTITA) AS PESO_TOTALE\n" +
                    "    FROM ordine o2\n" +
                    "    JOIN voce v ON o2.ID_ORDINE = v.ID_ORDINE\n" +
                    "    JOIN articolo a ON v.ID_ARTICOLO = a.ID_ARTICOLO\n" +
                    "    GROUP BY o2.ID_ORDINE\n" +
                    ") AS w ON w.ordine_id = o.ID_ORDINE\n" +
                    "JOIN tariffa_corriere tc\n" +
                    "    ON tc.PESO_MASSIMO >= w.PESO_TOTALE\n" +
                    "WHERE tc.COSTO = (\n" +
                    "    SELECT MIN(tc2.COSTO)\n" +
                    "    FROM tariffa_corriere tc2\n" +
                    "    WHERE tc2.PESO_MASSIMO >= w.PESO_TOTALE\n" +
                    ")\n" +
                    "ORDER BY o.ID_ORDINE ASC;";
            comando = conn.prepareStatement(query);
            ResultSet rs = comando.executeQuery();
            while (rs.next()) {
                Ordine ordine = new Ordine(
                        rs.getLong("ID_ORDINE"),
                        rs.getInt("NUMERO"),
                        rs.getString("DATA_ORDINE"),
                        rs.getDouble("COSTO"),
                        rs.getString("NOME_CORRIERE"),
                        rs.getString("NOME_TARIFFA"));
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