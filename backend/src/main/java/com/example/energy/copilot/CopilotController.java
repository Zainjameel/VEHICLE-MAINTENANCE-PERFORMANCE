package com.example.energy.copilot;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/copilot")
public class CopilotController {

  private final CopilotContextService contextService;
  private final OllamaClient ollama;

  public CopilotController(CopilotContextService contextService) {
    this.contextService = contextService;
    this.ollama = new OllamaClient();
  }

  @PostMapping("/ask")
  public Map<String, String> ask(@RequestBody Map<String, Object> body) {
    String q = String.valueOf(body.getOrDefault("question", "")).trim();
    int limit = 5;

    String context = contextService.buildContext(limit);

    String prompt = """
  You are Copilot for an energy savings dashboard.
  Answer the user's question using ONLY the context below.
  If the context is insufficient, say what data is missing.

  USER QUESTION:
  %s

  CONTEXT:
  %s
  """.formatted(q, context);

  String answer = ollama.generate("mistral", prompt);
  return Map.of("answer", answer);
  }
}