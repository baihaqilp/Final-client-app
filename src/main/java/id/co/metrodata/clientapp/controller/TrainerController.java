package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.ClassroomService;

@Controller
@RequestMapping("/Trainer")

public class TrainerController {

    private ClassroomService classroomService;

    @GetMapping("/dashboard")
    public String dashboard() {
        return "trainer/index";
    }

    @GetMapping("/classroom")
    public String classTrainer() {
        return "trainer/class/class";
    }

    @GetMapping("/class-detail")
    public String classTrainerDetail() {
        return "trainer/class/detailClass";
    }

    @GetMapping("/calssroom/segment/submission")
    public String submissionTrainer() {
        return "trainer/submission/submission";
    }

    @GetMapping("/classroom/segment/task")
    public String taskTrainer() {
        return "trainer/task/task";
    }

    @GetMapping("/classroom/segment/materi")
    public String materi() {
        return "trainer/materi/materi";
    }

    @GetMapping("/materi-add")
    public String materiAdd() {
        return "trainer/materi/addMateri";
    }

    @GetMapping("/materi-edit")
    public String materiEdit() {
        return "trainer/materi/editMateri";
    }

    @GetMapping("/grade")
    public String gradeAdmin() {
        return "trainer/grade/grade";
    }

    @GetMapping("/trainee")
    public String traineeTrainer() {
        return "trainer/trainee/trainee";
    }

    @GetMapping("/trainee-detail")
    public String traineeDetailTrainer() {
        return "trainer/trainee/detailTrainee";
    }

    @GetMapping("/classroom/{id}")
    public String trainerSegment(@PathVariable long id) {
        // model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/class/detailClass";
    }

    @GetMapping("/classroom/segment/{id}")
    public String trainerMateri(@PathVariable long id) {
        // model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/materi/materi";
    }

    @GetMapping("/classroom/segment/materi/{id}")
    public String materiEdit(@PathVariable Long id) {
        return "trainer/materi/editMateri";
    }

    @GetMapping("/topic")
    public String topic() {
        return "trainer/topic/topic";
    }

    @GetMapping("/topic/{id}")
    public String topicDetail(@PathVariable long id) {
        return "trainer/topic/topic";
    }
}
