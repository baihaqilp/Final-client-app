package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/role")
@AllArgsConstructor
public class RoleController {

    @GetMapping
    public String index() {
        return "role/index";
    }

}
