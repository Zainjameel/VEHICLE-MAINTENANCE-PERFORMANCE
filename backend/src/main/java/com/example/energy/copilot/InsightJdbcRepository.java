package com.example.energy.copilot;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InsightJdbcRepository {

  private final JdbcTemplate jdbc;

  public InsightJdbcRepository(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<InsightRow> topSuccessful(int limit) {
  String sql = """
    SELECT
      i.id                     AS insight_id,
      i.insight_name           AS insight_name,
      i.projected_savings_usd  AS savings,
      i.assignee               AS assignee,
      i.date_closed            AS date_closed,
      i.last_active            AS last_active,

      i.twin_id                AS twin_id,
      t.name                   AS twin_name,
      t.address                AS twin_address,

      i.creator_id             AS creator_id,
      c.name                   AS creator_name,
      c.position               AS creator_position

    FROM insights i
    JOIN twins t    ON t.id = i.twin_id
    JOIN creators c ON c.id = i.creator_id

    -- "successful" based on being closed (since no status column exists)
    WHERE i.date_closed IS NOT NULL

    ORDER BY i.projected_savings_usd DESC
    LIMIT ?
    """;

  return jdbc.query(sql, (rs, rowNum) -> new InsightRow(
      rs.getLong("insight_id"),
      rs.getString("insight_name"),
      rs.getBigDecimal("savings"),
      rs.getString("assignee"),
      rs.getObject("date_closed", java.time.LocalDateTime.class),
      rs.getObject("last_active", java.time.LocalDateTime.class),

      rs.getLong("twin_id"),
      rs.getString("twin_name"),
      rs.getString("twin_address"),

      rs.getLong("creator_id"),
      rs.getString("creator_name"),
      rs.getString("creator_position")
  ), limit);
}
}