package id.co.metrodata.clientapp.controller;

import java.util.Locale;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.javafaker.Faker;

import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;
import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.SegmenService;
import id.co.metrodata.clientapp.service.TaskService;
import id.co.metrodata.clientapp.service.UserService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainer")
@AllArgsConstructor
public class TrainerController {

    private ClassroomService classroomService;
    private SegmenService segmenService;
    private UserService userService;
    private TaskService taskService;

    @GetMapping
    public String dashboard() {
        return "index";
    }

    @GetMapping("/classroom/trainer")
    public String classTrainer() {

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
        return "trainer/task/";
    }

    // get all task by trainer-class-id
    @GetMapping("/task")
    public String task() {
        return "trainer/task/task";
    }

    @GetMapping("/topic/segment/{id}")
    public String topicBySegmentId(@PathVariable long id) {
        return "trainer/topic/topicDataTable";
    }

    @GetMapping("/materi/{id}")
    public String getMtariByTopicId(@PathVariable long id) {
        return "trainer/materi/materi";
    }

    // menu materi side bar
    @GetMapping("/materi")
    public String materi() {
        return "trainer/materi/listMateri";
    }

    @GetMapping("/materi/add")
    public String materiAdd() {
        return "trainer/materi/addMateri";
    }

    // ok
    @GetMapping("/materi/edit/{id}")
    public String materiEdit(@PathVariable long id) {
        return "trainer/materi/editMateri";
    }

    // grade
    @GetMapping("/grade")
    public String gradeAdmin() {
        return "trainer/grade/grade";
    }

    @GetMapping("/grade/class/{class_id}")
    public String gradeClass(@PathVariable long class_id) {
        return "trainer/grade/listGrade";
    }

    @GetMapping("/trainee")
    public String traineeTrainer() {
        return "trainer/trainee/trainee";
    }

    @GetMapping("/trainee-detail")
    public String traineeDetailTrainer() {
        return "trainer/trainee/detailTrainee";
    }

    @GetMapping("/classroom/{class_id}/trainer")
    public String trainerSegment(@PathVariable long class_id) {
        // model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/class/classDetail";
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
    public String topicList() {
        return "trainer/topic/topic";
    }

    @GetMapping("/topic/{id}")
    public String topicDetail(@PathVariable long id) {
        return "trainer/topic";
    }

    @GetMapping("/profile")
    public String profile() {
        return "trainer/profile/profile";
    }

    // @PostMapping("/fakeTrainer")
    // public User fakeTrainer() {
    // Faker faker = new Faker(new Locale("in-ID"));

    // TrainerRequest trainer = new TrainerRequest();
    // trainer.setAddress(faker.address().city());
    // trainer.setEmail(faker.internet().emailAddress());
    // trainer.setRoleId(1);
    // String name = faker.name().username();
    // trainer.setName(name);
    // trainer.setUsername(name);
    // trainer.setPassword(name);
    // trainer.setPhone(faker.phoneNumber().phoneNumber());
    // return userService.create(trainer);
    // }
}
