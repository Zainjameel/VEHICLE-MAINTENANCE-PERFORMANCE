package com.example.energy.insight;

import com.example.energy.creator.CreatorRepository;
import com.example.energy.twin.TwinRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lookups")
@CrossOrigin(origins = {"http://localhost:5173"})
public class LookupController {

  private final TwinRepository twinRepo;
  private final CreatorRepository creatorRepo;

  public LookupController(TwinRepository twinRepo, CreatorRepository creatorRepo) {
    this.twinRepo = twinRepo;
    this.creatorRepo = creatorRepo;
  }

  @GetMapping("/twins")
  public List<IdNameResponse> twins() {
    return twinRepo.findAllByOrderByNameAsc()
        .stream()
        .map(t -> new IdNameResponse(t.getId(), t.getName()))
        .toList();
  }

  @GetMapping("/creators")
  public List<IdNameResponse> creators() {
    return creatorRepo.findAllByOrderByNameAsc()
        .stream()
        .map(c -> new IdNameResponse(c.getId(), c.getName()))
        .toList();
  }
}