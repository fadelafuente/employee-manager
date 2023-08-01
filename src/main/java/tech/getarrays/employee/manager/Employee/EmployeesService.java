package tech.getarrays.employee.manager.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employee.manager.exception.UserNotFoundException;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeesService {
    private final EmployeesRepository repository;

    @Autowired
    public EmployeesService(EmployeesRepository repository) {
        this.repository = repository;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return repository.save(employee);
    }

    public List<Employee> findEmployees() {
        return repository.findAll();
    }

    public Employee findEmployeeById(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id " + id + " was not found"));
    }

    public Employee updateEmployee(Employee employee) {
        return repository.save(employee);
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}
