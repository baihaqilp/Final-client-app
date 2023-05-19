package id.co.metrodata.clientapp.controller.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.service.RegisterService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/register")
@AllArgsConstructor
public class RegisterController {

    private RegisterService registerService;

    @GetMapping
    public String home(TraineeRequest traineeRequest) {
        return "loginregis/register";
    }

    @PostMapping
    public String createTrainee(TraineeRequest user) {
        registerService.createTrainee(user);
        return "redirect:/login";
    }
}
