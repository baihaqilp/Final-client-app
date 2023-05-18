package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Trainer")
public class TrainerController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "trainer/index";
    }
}
