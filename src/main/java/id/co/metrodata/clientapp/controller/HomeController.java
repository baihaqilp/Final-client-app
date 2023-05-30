package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class HomeController {

    @GetMapping
    public String index(Model model) {
        model.addAttribute("link", "dashboard");
        return "index";
    }
}
