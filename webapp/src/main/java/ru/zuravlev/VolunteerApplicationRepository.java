package ru.zuravlev;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VolunteerApplicationRepository extends JpaRepository<VolunteerApplication, Long> {

    Optional<VolunteerApplication> findByVolunteerNumber(String volunteerNumber);

    boolean existsByVolunteerNumber(String volunteerNumber);

    List<VolunteerApplication> findAllByOrderByCreatedAtDesc();

    long countByCorp(String corp);
}
