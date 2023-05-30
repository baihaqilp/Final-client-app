package id.co.metrodata.clientapp.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.apache.tomcat.jni.Local;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.github.javafaker.Faker;

import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.SubmissionRequest;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;
import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.FileStorageService;
import id.co.metrodata.clientapp.service.MateriService;
import id.co.metrodata.clientapp.service.RegisterService;
import id.co.metrodata.clientapp.service.SegmenService;
import id.co.metrodata.clientapp.service.SegmentTopicService;
import id.co.metrodata.clientapp.service.SubmissionService;
import id.co.metrodata.clientapp.service.TaskService;
import id.co.metrodata.clientapp.service.UserService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainee")
@AllArgsConstructor
@PreAuthorize("hasAnyRole('ROLE_TRAINEE','ROLE_TRAINER','ROLE_ADMIN')")
public class TraineeController {

  private ClassroomService classroomService;
  private FileStorageService fileStorageService;
  private SubmissionService submissionService;
  private TaskService taskService;
  private SegmenService segmenService;
  private SegmentTopicService segmentTopicService;
  private MateriService materiService;
  private RegisterService registerService;

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping
  public String dashboard(Model model) {

    model.addAttribute("segments", segmenService.getSegmentClassTrainee());
    // model.addAttribute("segmentTopics", segmentTopicService.getBySegment());
    model.addAttribute("message", " ");
    model.addAttribute("active", "home");
    return "trainee/index";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/class")
  public String traineeClass() {
    return "trainee/class/class";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/profile")
  public String getProfile() {
    return "trainee/profile";
  }

  // @GetMapping("/topic/{id}")
  // private String topicBySegment(@PathVariable Long id) {
  // return "trainee/topic/topic";
  // }
  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/topic/{id}")
  public String topicBySegment(@PathVariable Long id, Model model) {
    model.addAttribute("materies", materiService.getByTopicId(id));
    return "trainee/topic";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/topic/materi/{id}")
  public String materi(@PathVariable Long id, Model model) {
    model.addAttribute("materi", materiService.getById(id));
    return "trainee/detailMateri";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/class/{id}")
  public String traineeClassDetail(@PathVariable Long id, Model model) {
    model.addAttribute("classroom", classroomService.getById(id));
    return "trainee/class/detailClass";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/task")
  public String traineeTask(Model model) {
    model.addAttribute("message", "");
    model.addAttribute("active", "task");
    return "trainee/task";
  }

  // SUBMISSION
  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/submission")
  public String traineeSubmission() {
    return "trainee/submission/submission";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/task/{task_id}/submission-add")
  public String traineeAddSubmission(@PathVariable long task_id, Model model) {
    Task task = taskService.getById(task_id);
    model.addAttribute("task", task);
    return "trainee/detailTask";
  }

  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @PostMapping("/task/{task_id}/submission-add")
  public String handleFileUpload(@PathVariable long task_id,
      @RequestParam("fileInput") MultipartFile file,
      RedirectAttributes redirectAttributes) {
    try {
      String fileName = file.getOriginalFilename();
      String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
          .path("/trainee/downloadFile/")
          .path(fileName)
          .toUriString();
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
      LocalDateTime now = LocalDateTime.now();

      String date = now.format(formatter);
      fileStorageService.store(file);
      SubmissionRequest submission = new SubmissionRequest();
      submission.setSubmission_file(file.getOriginalFilename());
      submission.setSubmission_url(fileDownloadUri);

      submission.setSubmission_date(date);
      submission.setTaskId(task_id);
      submissionService.create(submission);
      redirectAttributes.addFlashAttribute("message", "success");
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("message", "failed");
    }

    return "redirect:/task/trainee";
  }

  @PreAuthorize("hasAnyAuthority('READ_TRAINEE', 'READ_TRAINER', 'READ_ADMIN')")
  @GetMapping("/downloadFile/{filename:.+}")
  @ResponseBody
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

    Resource file = fileStorageService.loadAsResource(filename);
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + file.getFilename() + "\"").body(file);
  }

  // GRADE
  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/grade")
  public String traineeGrade() {
    return "trainee/grade/grade";
  }

  // TASK
  @PreAuthorize("hasAuthority('READ_TRAINEE')")
  @GetMapping("/task/segment/{segment_id}")
  public String taskSegment(@PathVariable long segment_id) {
    return "trainee/task/taskSegment";
  }

  // @PostMapping("/fakeTrainee")
  // public User fakeTrainee() {
  // Faker faker = new Faker(new Locale("in-ID"));

  // TraineeRequest trainer = new TraineeRequest();
  // trainer.setAddress(faker.address().city());
  // trainer.setEmail(faker.internet().emailAddress());
  // trainer.setRoleId(2);
  // String name = faker.name().username();
  // trainer.setName(name);
  // trainer.setUsername(name);
  // trainer.setPassword(name);
  // trainer.setPhone(faker.phoneNumber().phoneNumber());
  // trainer.setClassroomId(faker.number().numberBetween(0, 7));
  // return registerService.createTrainee(trainer);
  // }
}
