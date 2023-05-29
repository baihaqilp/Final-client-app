package id.co.metrodata.clientapp.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainer")
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class TrainerController {

    private TaskService taskService;

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping
    public String dashboard() {
        return "index";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/classroom/trainer")
    public String classTrainer() {

        return "trainer/class/class";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/class-detail")
    public String classTrainerDetail() {
        return "trainer/class/detailClass";
    }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // @GetMapping("/calssroom/submission/segment/{id}")
    // public String submissionTrainer(@PathVariable long id) {
    // return "trainer/submission/submissionBySegment";
    // }

    @PreAuthorize("hasAuthority('READTRAINER')")
    @GetMapping("/classroom/segment/task/{segment_id}")
    public String taskTrainer(@PathVariable long segment_id) {
        return "trainer/task/task";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/classroom/segment/task/detail/{id}")
    public String detailtaskTrainer(@PathVariable long id, Model model) {
        model.addAttribute("task", taskService.getById(id));
        return "trainer/task/detailTask";
    }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // // get task by segment id
    // @GetMapping("/task/segment/{segment_id}")
    // public String taskBySegmentId(@PathVariable long segment_id) {
    // return "trainer/task/";
    // }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    // get all task by trainer-class-id
    @GetMapping("/task")
    public String task() {
        return "trainer/task/task";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/topic/segment/{id}")
    public String topicBySegmentId(@PathVariable long id) {
        return "trainer/topic/topicDataTable";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/materi/{id}")
    public String getMtariByTopicId(@PathVariable long id) {
        return "trainer/materi/materi";
    }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // // menu materi side bar
    // @GetMapping("/materi")
    // public String materi() {
    // return "trainer/materi/listMateri";
    // }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/materi/add")
    public String materiAdd() {
        return "trainer/materi/addMateri";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    // ok
    @GetMapping("/materi/edit/{id}")
    public String materiEdit(@PathVariable long id) {
        return "trainer/materi/editMateri";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    // grade
    @GetMapping("/grade")
    public String gradeAdmin() {
        return "trainer/grade/grade";
    }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // @GetMapping("/grade/class/{class_id}")
    // public String gradeClass(@PathVariable long class_id) {
    // return "trainer/grade/listGrade";
    // }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // @GetMapping("/trainee")
    // public String traineeTrainer() {
    // return "trainer/trainee/trainee";
    // }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // @GetMapping("/trainee-detail")
    // public String traineeDetailTrainer() {
    // return "trainer/trainee/detailTrainee";
    // }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/classroom/{class_id}/trainer")
    public String trainerSegment(@PathVariable long class_id) {
        // model.addAttribute("classroom", classroomService.getById(id));
        return "trainer/class/classDetail";
    }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // @GetMapping("/classroom/segment/{id}")
    // public String trainerMateri(@PathVariable long id) {
    // // model.addAttribute("classroom", classroomService.getById(id));
    // return "trainer/topic/topic";
    // }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/classroom/segment/materi/{id}")
    public String materiEdit(@PathVariable Long id) {
        return "trainer/materi/editMateri";
    }

    // @PreAuthorize("hasAuthority('READ_TRAINER')")
    // @GetMapping("/trainee/classroom/{id}")
    // public String traineeByClassId(@PathVariable Long id) {
    // return "trainer/trainee/trainee";
    // }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/topic")
    public String topicList() {
        return "trainer/topic/topic";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER')")
    @GetMapping("/topic/{id}")
    public String topicDetail(@PathVariable long id) {
        return "trainer/topic";
    }

    @PreAuthorize("hasAuthority('READ_TRAINER','READ_ADMIN')")
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
