package id.co.metrodata.clientapp.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.apache.tomcat.jni.Local;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
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

import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.model.dto.request.SubmissionRequest;
import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.FileStorageService;
import id.co.metrodata.clientapp.service.SubmissionService;
import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainee")
@AllArgsConstructor
public class TraineeController {

  private ClassroomService classroomService;
  private FileStorageService fileStorageService;
  private SubmissionService submissionService;
  private TaskService taskService;

  @GetMapping
  private String dashboard(Model model) {
    return "trainee/index";
  }

  @GetMapping("/class")
  private String traineeClass() {
    return "trainee/class/class";
  }

  @GetMapping("/topic/{id}")
  private String topicBySegment(@PathVariable Long id) {
    return "trainee/topic/topic";
  }

  @GetMapping("/topic/materi/{materi_id}")
  private String materi(@PathVariable Long materi_id) {
    return "trainee/materi/materi";
  }

  @GetMapping("/class/{id}")
  private String traineeClassDetail(@PathVariable Long id, Model model) {
    model.addAttribute("classroom", classroomService.getById(id));
    return "trainee/class/detailClass";
  }

  @GetMapping("/task/{segment_id}")
  private String traineeTask(@PathVariable Long segment_id) {
    return "trainee/task/task";
  }

  // SUBMISSION
  @GetMapping("/submission")
  private String traineeSubmission() {
    return "trainee/submission/submission";
  }

  @GetMapping("/task/{task_id}/submission-add/{trainee_id}")
  private String traineeAddSubmission(@PathVariable long trainee_id, @PathVariable long task_id) {
    Task task = taskService.getById(task_id);
    LocalDateTime now = LocalDateTime.now();
    int res = now.compareTo(task.getDeadline());
    if (res > 0) {
      return "redirect:/trainee/submission";
    }
    return "trainee/submission/addSubmission";
  }

  @PostMapping("/task/{task_id}/submission-add/{trainee_id}")
  public String handleFileUpload(@PathVariable long task_id, @PathVariable long trainee_id,
      @RequestParam("fileInput") MultipartFile file,
      RedirectAttributes redirectAttributes) {
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
    submission.setEmployeeId(trainee_id);
    submission.setTaskId(task_id);
    submissionService.create(submission);
    redirectAttributes.addFlashAttribute("message",

        "You successfully uploaded " + file.getOriginalFilename() + "!");

    return "redirect:/trainee/task/{task_id}/submission-add/{trainee_id}";
  }

  @GetMapping("/downloadFile/{filename:.+}")
  @ResponseBody
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

    Resource file = fileStorageService.loadAsResource(filename);
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"" + file.getFilename() + "\"").body(file);
  }

  // GRADE
  @GetMapping("/grade")
  private String traineeGrade() {
    return "trainee/grade/grade";
  }

}
