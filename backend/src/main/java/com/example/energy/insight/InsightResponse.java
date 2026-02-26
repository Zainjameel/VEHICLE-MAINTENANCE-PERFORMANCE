package com.example.energy.insight;

import java.time.LocalDateTime;
 


public record InsightResponse(
  Long id,
  String insightName,
  Double projectedSavingsUsd,
  String assignee,
  LocalDateTime dateClosed,
  LocalDateTime lastActive,
  TwinDto twin,
  CreatorDto creator
) {
  public record TwinDto(Long id, String name, String address) {}
  public record CreatorDto(Long id, String name, String position) {}
  public static InsightResponse from(Insight i) {
  return new InsightResponse(
      i.getId(),
      i.getInsightName(),
      i.getProjectedSavingsUsd() == null ? null :
          i.getProjectedSavingsUsd().doubleValue(),   // FIX BigDecimal -> Double
      i.getAssignee(),
      i.getDateClosed(),     // must match entity type
      i.getLastActive(),
      new TwinDto(
          i.getTwin().getId(),
          i.getTwin().getName(),
          i.getTwin().getAddress()
      ),
      new CreatorDto(
          i.getCreator().getId(),
          i.getCreator().getName(),
          i.getCreator().getPosition()
      )
  );
}
}