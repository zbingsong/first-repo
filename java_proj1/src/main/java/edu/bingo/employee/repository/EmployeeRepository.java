package edu.bingo.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.bingo.employee.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    // JpaRepository has implemented many useful methods already.
    // They can be used by parametrizing JpaRepository.
}
