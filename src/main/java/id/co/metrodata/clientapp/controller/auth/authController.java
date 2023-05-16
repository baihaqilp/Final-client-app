package id.co.metrodata.clientapp.controller.auth;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class authController {

  @GetMapping
  public String home() {
    return "loginregis/register";
  }

  @GetMapping("/login")
  public String login() {
    return "loginregis/login";
  }

  @GetMapping("/dashboard")
  public String dashboard() {
    return "trainer/index";
  }

  @GetMapping("/dashboard-tarinee")
  public String dashboardTrainee() {
    return "trainee/index";
  }

  @GetMapping("/dashboard-admin")
  public String dashboardAdmin() {
    return "admin/index";
  }
}
