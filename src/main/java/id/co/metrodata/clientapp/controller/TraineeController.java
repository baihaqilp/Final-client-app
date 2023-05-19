package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.ClassroomService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainee")
@AllArgsConstructor
public class TraineeController {

  private ClassroomService classroomService;

  @GetMapping
  private String dashboard() {
    return "trainee/index";
  }

  @GetMapping("/class")
  private String traineeClass() {
    return "trainee/class/class";
  }

  @GetMapping("/class/{id}")
  private String traineeClassDetail(@PathVariable Long id, Model model) {
    model.addAttribute("classroom", classroomService.getById(id));
    return "trainee/class/detailClass";
  }

  @GetMapping("/task")
  private String traineeTask() {
    return "trainee/task/task";
  }

  @GetMapping("/submission")
  private String traineeSubmission() {
    return "trainee/submission/submission";
  }

  @GetMapping("/submission-add")
  private String traineeAddSubmission() {
    return "trainee/submission/addSubmission";
  }

}
