package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.SegmenService;
import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/Trainer")
@AllArgsConstructor
public class TrainerController {

    private SegmenService segmenService2;
    private ClassroomService classroomService;
    private SegmenService segmenService;
    private TaskService taskService;

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

    @GetMapping("/classroom/segment/task/{segment_id}")
    public String taskTrainer(@PathVariable long segment_id) {
        return "trainer/task/task";
    }

    @GetMapping("/classroom/segment/task/detail/{id}")
    public String detailtaskTrainer(@PathVariable long id, Model model) {
        model.addAttribute("task", taskService.getById(id));
        return "trainer/task/detailTask";
    }

    // get task by segment id
    @GetMapping("/task/segment/{segment_id}")
    public String taskBySegmentId(@PathVariable long segment_id) {
        return "trainer/task/task";
    }

    // get all task by trainer-class-id
    @GetMapping("/task")
    public String task() {
        return "trainer/task/allTrainerTask";
    }

    @GetMapping("/topic/segment/{id}")
    public String topicBySegmentId(@PathVariable long id) {
        return "trainer/topic/topicDataTable";
    }

    // buka materi
    @GetMapping("/materi/{id}")
    public String getMateriByMateriId(@PathVariable long id) {
        return "trainer/materi/materi";
    }

    // menu materi side bar
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
