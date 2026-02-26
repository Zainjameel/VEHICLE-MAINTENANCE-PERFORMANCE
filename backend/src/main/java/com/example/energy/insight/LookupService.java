package com.example.energy.insight;

import org.springframework.stereotype.Service;
import com.example.energy.twin.TwinRepository;
import com.example.energy.creator.CreatorRepository;
import java.util.List;

@Service
public class LookupService {

  private final TwinRepository twinRepo;
  private final CreatorRepository creatorRepo;

  public LookupService(TwinRepository twinRepo, CreatorRepository creatorRepo) {
    this.twinRepo = twinRepo;
    this.creatorRepo = creatorRepo;
  }

  public List<IdNameResponse> getTwins() {
    return twinRepo.findAll()
      .stream()
      .map(t -> new IdNameResponse(t.getId(), t.getName()))
      .toList();
  }

  public List<IdNameResponse> getCreators() {
    return creatorRepo.findAll()
      .stream()
      .map(c -> new IdNameResponse(c.getId(), c.getName()))
      .toList();
  }
}
