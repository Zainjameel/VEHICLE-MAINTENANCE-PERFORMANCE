package com.example.energy.twin;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TwinRepository extends JpaRepository<Twin, Long> {
  List<Twin> findAllByOrderByNameAsc();
}