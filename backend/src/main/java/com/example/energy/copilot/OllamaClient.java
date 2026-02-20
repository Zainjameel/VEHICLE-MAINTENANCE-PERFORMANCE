package com.example.energy.copilot;


import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class OllamaClient {
  private final RestClient rest;

  public OllamaClient() {
    this.rest = RestClient.builder()
        .baseUrl("http://ollama:11434")
        .build();
  }

  public String generate(String model, String prompt) {
    Map<String, Object> payload = Map.of(
        "model", model,
        "prompt", prompt,
        "stream", false
    );

    @SuppressWarnings("unchecked")
    Map<String, Object> res = rest.post()
        .uri("/api/generate")
        .contentType(MediaType.APPLICATION_JSON)
        .body(payload)
        .retrieve()
        .body(Map.class);

    if (res == null) return "LLM returned empty response.";
    Object response = res.get("response");
    return response == null ? "LLM response missing 'response' field." : response.toString();
  }
}