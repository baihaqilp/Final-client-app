package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.SegmenService;
import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/Trainer")
@AllArgsConstructor
public class TrainerController {

    private ClassroomService classroomService;
    private SegmenService segmenService;
    private TaskService taskService;

    @GetMapping("/dashboard")
    public String dashboard() {
        return "trainer/index";
    }

    @GetMapping("/classroom/trainer/{trainer_id}")
    public String classTrainer(@PathVariable long trainer_id, Model model) {

        return "trainer/class/class";
    }

    @GetMapping("/class-detail")
    public String classTrainerDetail() {
        return "trainer/class/detailClass";
    }

    @GetMapping("/calssroom/submission/segment/{id}")
    public String submissionTrainer(@PathVariable long id) {
        return "trainer/submission/submissionBySegment";
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

    @GetMapping("/topic/segment/{id}")
    public String topicBySegmentId(@PathVariable long id) {
        return "trainer/topic/topicBySegment";
    }

    @GetMapping("/materi/topic/{id}")
    public String getMtariByTopicId(@PathVariable long id) {
        return "trainer/materi/materi";
    }

    @GetMapping("/materi-add")
    public String materiAdd() {
        return "trainer/materi/addMateri";
    }

    @GetMapping("/materi/edit/{id}")
    public String materiEdit(@PathVariable long id) {
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

    @GetMapping("/classroom/{class_id}/trainer/{trainer_id}")
    public String trainerSegment(@PathVariable long class_id, @PathVariable long trainer_id) {
        // model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/class/detailClass";
    }

    @GetMapping("/classroom/segment/{id}")
    public String trainerMateri(@PathVariable long id) {
        // model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/topic/topic";
    }

    @GetMapping("/classroom/segment/materi/{id}")
    public String materiEdit(@PathVariable Long id) {
        return "trainer/materi/editMateri";
    }

    @GetMapping("/trainee/classroom/{id}")
    public String traineeByClassId(@PathVariable Long id) {
        return "trainer/trainee/trainee";
    }

    @GetMapping("/topic")
    public String topic() {
        return "trainer/materi/materi";
    }

    @GetMapping("/topic/{id}")
    public String topicDetail(@PathVariable long id) {
        return "trainer/topic/topic";
    }
}
