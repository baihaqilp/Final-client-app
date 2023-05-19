package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.SegmenService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/Trainer")
@AllArgsConstructor
public class TrainerController {

    private SegmenService segmenService;
    private ClassroomService classroomService;

    @GetMapping("/dashboard")
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

    @GetMapping("/classroom/segment/task")
    public String taskTrainer() {
        return "trainer/task/task";
    }

    @GetMapping("/materi")
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
    public String trainerSegment(@PathVariable long id, Model model) {
        model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/segment/segment";
    }

}
