package com.example.energy.insight;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.example.energy.twin.Twin;
import com.example.energy.creator.Creator;


@Entity
@Table(name = "insights")
public class Insight {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "insight_name", nullable = false)
  private String insightName;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "twin_id", nullable = false)
  private Twin twin;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "creator_id", nullable = false)
  private Creator creator;

  @Column(name = "projected_savings_usd", nullable = false, precision = 12, scale = 2)
  private BigDecimal projectedSavingsUsd;

  private String assignee;

  @Column(name = "date_closed")
  private LocalDateTime dateClosed;

  @Column(name = "last_active")
  private LocalDateTime lastActive;

  // getters/setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getInsightName() {
    return insightName;
  }

  public void setInsightName(String insightName) {
    this.insightName = insightName;
  }

  public Twin getTwin() {
    return twin;
  }

  public void setTwin(Twin twin) {
    this.twin = twin;
  }

  public Creator getCreator() {
    return creator;
  }

  public void setCreator(Creator creator) {
    this.creator = creator;
  }

  public BigDecimal getProjectedSavingsUsd() {
    return projectedSavingsUsd;
  }

  public void setProjectedSavingsUsd(BigDecimal projectedSavingsUsd) {
    this.projectedSavingsUsd = projectedSavingsUsd;
  }

  public String getAssignee() {
    return assignee;
  }

  public void setAssignee(String assignee) {
    this.assignee = assignee;
  }

  public LocalDateTime getDateClosed() {
    return dateClosed;
  }

  public void setDateClosed(LocalDateTime dateClosed) {
    this.dateClosed = dateClosed;
  }

  public LocalDateTime getLastActive() {
    return lastActive;
  }

  public void setLastActive(LocalDateTime lastActive) {
    this.lastActive = lastActive;
  }
}