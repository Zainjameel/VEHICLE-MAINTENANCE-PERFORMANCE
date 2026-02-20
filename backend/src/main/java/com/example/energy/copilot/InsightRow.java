package com.example.energy.copilot;


import java.time.OffsetDateTime;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InsightRow(
    Long insightId,
    String insightName,
    BigDecimal savings,
    String assignee,
    java.time.LocalDateTime dateClosed,
    java.time.LocalDateTime lastActive,
    Long twinId,
    String twinName,
    String twinAddress,
    Long creatorId,
    String creatorName,
    String creatorPosition
) {}