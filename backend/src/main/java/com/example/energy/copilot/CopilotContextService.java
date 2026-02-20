package com.example.energy.copilot;

import org.springframework.stereotype.Service;

import java.util.List;
import java.math.BigDecimal;
import java.util.Objects;

@Service
public class CopilotContextService {

  private final InsightJdbcRepository repo;

  public CopilotContextService(InsightJdbcRepository repo) {
    this.repo = repo;
  }

  public String buildContext(int limit) {
    List<InsightRow> rows = repo.topSuccessful(limit);

    if (rows.isEmpty()) {
      return "No SUCCESS insights found in the database.";
    }

    BigDecimal totalSavings = rows.stream()
    .map(InsightRow::savings)
    .filter(Objects::nonNull)
    .reduce(BigDecimal.ZERO, BigDecimal::add);

    String totalSavingsStr = totalSavings
    .setScale(2, java.math.RoundingMode.HALF_UP)
    .toPlainString();

    StringBuilder sb = new StringBuilder();
    sb.append("Top SUCCESS insights (").append(rows.size()).append(" rows)\n");
    sb.append("Total savings (these rows): ").append(totalSavingsStr).append("\n\n");

    for (int i = 0; i < rows.size(); i++) {
      InsightRow r = rows.get(i);
      sb.append(i + 1).append(") ");
      sb.append("Insight #").append(r.insightId()).append(" | ");
      sb.append("Savings: ").append(r.savings()).append(" | ");
      sb.append("Twin: ").append(r.twinName()).append(" (").append(r.twinId()).append(") | ");
      sb.append("Creator: ").append(r.creatorName()).append(" (").append(r.creatorId()).append(")\n");
    }

    return sb.toString();
  }
}