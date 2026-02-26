package com.example.energy.creator;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CreatorRepository extends JpaRepository<Creator, Long> {
  List<Creator> findAllByOrderByNameAsc();
}