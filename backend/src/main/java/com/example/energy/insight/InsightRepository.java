package com.example.energy.insight;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;


public interface InsightRepository extends JpaRepository<Insight, Long> {

  @Query("select i from Insight i join fetch i.twin join fetch i.creator order by i.projectedSavingsUsd desc")
  List<Insight> findTopInsights(Pageable pageable);
}