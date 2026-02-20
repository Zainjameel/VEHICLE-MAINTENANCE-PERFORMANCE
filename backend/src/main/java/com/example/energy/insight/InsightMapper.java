package com.example.energy.insight; 

import com.example.energy.creator.Creator;
import com.example.energy.twin.Twin;
import java.math.BigDecimal;
import jakarta.persistence.*;



public class InsightMapper {
  public static InsightResponse toResponse(Insight i) {
    var t = i.getTwin();
    var c = i.getCreator();
    return new InsightResponse(
      i.getId(),
      i.getInsightName(),
      i.getProjectedSavingsUsd().doubleValue(),
      i.getAssignee(),
      i.getDateClosed(),
      i.getLastActive(),
      new InsightResponse.TwinDto(t.getId(), t.getName(), t.getAddress()),
      new InsightResponse.CreatorDto(c.getId(), c.getName(), c.getPosition())
    );
  }
}