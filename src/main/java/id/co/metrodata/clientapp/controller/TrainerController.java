package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/trainer")
public class TrainerController {

    @GetMapping
    public String dashboard() {
        return "trainer/index";
    }

    @GetMapping("/class")
    public String classTrainer() {
        return "trainer/class/class";
    }

    @GetMapping("/class-detail")
    public String classTrainerDetail() {
        return "trainer/class/detailClass";
    }

    @GetMapping("/submission")
    public String submissionTrainer() {
        return "trainer/submission/submission";
    }

    @GetMapping("/task")
    public String taskTrainer() {
        return "trainer/task/task";
    }
}
