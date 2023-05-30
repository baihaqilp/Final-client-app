package id.co.metrodata.clientapp.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
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
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    private ClassroomService classroomService;

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping
    public String dashboardAdmin() {
        return "/index";
    }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/class")
    public String classAdmin(Model model) {
        model.addAttribute("link", "classroom");
        return "admin/class/class";
    }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/classHistory")
    public String historyclassAdmin(Model model) {
        model.addAttribute("link", "classroom");
        return "admin/class/historyClass";
    }

    // @PreAuthorize("hasAuthority('READ_ADMIN')")
    // @GetMapping("/class-add")
    // public String addClass() {
    // return "admin/class/addClass";
    // }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/class/{id}")
    public String detailClass(@PathVariable long id, Model model) {
        model.addAttribute("classroom", classroomService.getById(id));
        model.addAttribute("link", "classroom");
        return "admin/class/detailClass";
    }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/class/{id}/trainee")
    public String listStudent(@PathVariable long id, Model model) {
        model.addAttribute("link", "classroom");
        return "admin/class/classTrainee";
    }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/trainer")
    public String trainerAdmin(Model model) {
        model.addAttribute("link", "trainer");

        return "admin/trainer/trainer";
    }

    // @PreAuthorize("hasAuthority('READ_ADMIN')")
    // @GetMapping("/trainer-detail")
    // public String trainerDetail() {
    // return "admin/trainer/detailTrainer";
    // }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/trainee")
    public String trainee(Model model) {
        model.addAttribute("link", "trainee");
        return "admin/trainee/index";
    }

    // hapus
    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/segmen    t")
    public String segment() {
        return "admin/segment/segment";
    }

    @PreAuthorize("hasAuthority('READ_ADMIN')")
    @GetMapping("/program")
    public String program(Model model) {
        model.addAttribute("link", "program");
        return "admin/program/index";
    }
}
