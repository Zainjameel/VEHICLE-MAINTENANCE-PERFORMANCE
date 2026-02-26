package com.example.energy.insight;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.example.energy.insight.InsightResponse;
import java.util.List;

@Service
public class InsightService {

  private final InsightRepository repo;

  public InsightService(InsightRepository repo) {
    this.repo = repo;
  }

  public List<InsightResponse> getTop(int limit) {
  int safe = Math.max(1, Math.min(limit, 50));
  return repo.findTopInsights(PageRequest.of(0, safe))
             .stream()
             .map(InsightMapper::toResponse)
             .toList();
}

  public List<Insight> getAll() {
    return repo.findAll();
  }

  public List<InsightResponse> getAllResponses() {
  return repo.findAllWithJoins()
      .stream()
      .map(InsightResponse::from)
      .toList();
}

  public Insight create(Insight i) {
    i.setId(null);
    return repo.save(i);
  }

  public Insight update(Long id, Insight i) {
    Insight existing = repo.findById(id).orElseThrow();
    existing.setInsightName(i.getInsightName());
    existing.setTwin(i.getTwin());
    existing.setProjectedSavingsUsd(i.getProjectedSavingsUsd());
    existing.setCreator(i.getCreator());
    existing.setAssignee(i.getAssignee());
    existing.setDateClosed(i.getDateClosed());
    existing.setLastActive(i.getLastActive());
    return repo.save(existing);
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }
}