package tech.getarrays.employee.manager.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
