package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainee")
@AllArgsConstructor
public class TraineeController {

  @GetMapping
  private String dashboard() {
    return "trainee/index";
  }

  @GetMapping("/class")
  private String traineeClass() {
    return "trainee/class/class";
  }
}
