package com.example.energy.insight;

import java.time.LocalDateTime;
import com.example.energy.creator.Creator;
import com.example.energy.twin.Twin;
import java.math.BigDecimal;
import jakarta.persistence.*;




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
}