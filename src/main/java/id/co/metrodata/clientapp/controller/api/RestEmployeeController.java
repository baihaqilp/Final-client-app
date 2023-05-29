package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.javafaker.Faker;

import id.co.metrodata.clientapp.model.Employee;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;
import id.co.metrodata.clientapp.model.dto.request.UserRequest;
import id.co.metrodata.clientapp.service.EmployeeService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@AllArgsConstructor
public class RestEmployeeController {

    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable long id) {
        return employeeService.getById(id);
    }

    @GetMapping("/profile")
    public Employee getProfile() {
        return employeeService.getProfile();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable long id, @RequestBody UserRequest employee) {
        return employeeService.update(id, employee);
    }

    @DeleteMapping("/{id}")
    public Employee delete(@PathVariable long id) {
        return employeeService.delete(id);
    }

    @GetMapping("/role/{id}")
    public List<Employee> getByRole(@PathVariable long id) {
        return employeeService.getByRole(id);
    }

    @GetMapping("/class/{id}")
    public List<Employee> getByClass(@PathVariable long id) {
        return employeeService.getByClass(id);
    }
}
