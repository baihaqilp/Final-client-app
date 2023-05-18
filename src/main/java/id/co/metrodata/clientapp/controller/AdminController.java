package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.ClassroomService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private ClassroomService classroomService;

    @GetMapping
    public String dashboardAdmin() {
        return "admin/index";
    }

    @GetMapping("/class")
    public String classAdmin() {
        return "admin/class/class";
    }

    @GetMapping("/class-add")
    public String addClass() {
        return "admin/class/addClass";
    }

    @GetMapping("/class/{id}")
    public String detailClass(@PathVariable long id, Model model) {
        model.addAttribute("classroom", classroomService.getById(id));
        return "admin/class/detailClass";
    }

    @GetMapping("/trainer")
    public String trainerAdmin() {
        return "admin/trainer/trainer";
    }

    @GetMapping("/trainer-detail")
    public String trainerDetail() {
        return "admin/trainer/detailTrainer";
    }

    @GetMapping("/trainee")
    public String trainee() {
        return "admin/trainee/index";
    }
}
