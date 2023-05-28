package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.MateriService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/materi")
@AllArgsConstructor
public class MateriController {

    private MateriService materiService;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("materi", materiService.getAll());
        return "materi/index";
    }
}
