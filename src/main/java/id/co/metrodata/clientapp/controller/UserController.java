package id.co.metrodata.clientapp.controller;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.service.UserService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    public String index(Model model) {
        model.addAttribute("users", userService.getAll());
        return "user/index";
    }

    @GetMapping("/profile")
    public String profile() {
        return "user/index";
    }

    @GetMapping("/profile/edit")
    public String update() {
        return "user/editUser";
    }
}
