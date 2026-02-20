package com.example.energy.insight;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = {"http://localhost:5173"}) // dev; docker uses Nginx proxy or same host
public class InsightController {

  private final InsightService service;

  public InsightController(InsightService service) {
    this.service = service;
  }

  @GetMapping("/top")
public List<InsightResponse> top(@RequestParam(name="limit", defaultValue="5") int limit) {
  return service.getTop(limit);
}
  
  @GetMapping
  public List<Insight> all() {
    return service.getAll();
  }

  @PostMapping
  public Insight create(@RequestBody Insight i) {
    return service.create(i);
  }

  @PutMapping("/{id}")
  public Insight update(@PathVariable Long id, @RequestBody Insight i) {
    return service.update(id, i);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }
}