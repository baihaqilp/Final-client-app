package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/task")
@AllArgsConstructor
public class TaskController {

    @GetMapping
    public String index() {
        return "task/index";
    }

}
