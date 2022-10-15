package edu.bingo.employee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.bingo.employee.model.AvailableRoles;
import edu.bingo.employee.model.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(AvailableRoles name);
}
