package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.model.Employee;
import id.co.metrodata.clientapp.service.EmployeeService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeController {

    private EmployeeService employeeService;

    public String index(Model model) {
        model.addAttribute("employees", employeeService.getAll());
        return "employee/index";
    }
}
