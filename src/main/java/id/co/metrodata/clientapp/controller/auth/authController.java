package id.co.metrodata.clientapp.controller.auth;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.model.dto.request.LoginRequest;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.service.LoginService;
import id.co.metrodata.clientapp.service.RegisterService;
import id.co.metrodata.clientapp.service.UserService;

@Controller
public class authController {

  private RegisterService registerService;
  private LoginService loginService;

  @GetMapping
  public String home(TraineeRequest traineeRequest) {
    return "loginregis/register";
  }

  @GetMapping("/login")
  public String loginView(LoginRequest loginRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication instanceof AnonymousAuthenticationToken) {
      return "loginregis/login";
    }
    return "redirect:/admin";
  }

  @PostMapping("/login")
  public String login(LoginRequest loginRequest) {
    if (!loginService.login(loginRequest)) {
      return "redirect:/login?error=true";
    }

    return "redirect:/admin";
  }

  @GetMapping("/dashboard-tarinee")
  public String dashboardTrainee() {
    return "trainee/index";
  }

}
