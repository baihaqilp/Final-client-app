package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/classroom")
@AllArgsConstructor
public class ClassroomController {

    @GetMapping
    public String index() {
        return "classroom/index";
    }

}
