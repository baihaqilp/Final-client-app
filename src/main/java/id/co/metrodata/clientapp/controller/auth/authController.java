package id.co.metrodata.clientapp.controller.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class authController {

  @GetMapping("/dashboard-tarinee")
  public String dashboardTrainee() {
    return "trainee/index";
  }

}
