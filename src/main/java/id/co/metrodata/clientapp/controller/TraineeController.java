package id.co.metrodata.clientapp.controller;

import java.time.LocalDate;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import id.co.metrodata.clientapp.model.Submission;
import id.co.metrodata.clientapp.model.dto.request.SubmissionRequest;
import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.FileStorageService;
import id.co.metrodata.clientapp.service.SubmissionService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/trainee")
@AllArgsConstructor
public class TraineeController {

  private ClassroomService classroomService;
  private FileStorageService fileStorageService;
  private SubmissionService submissionService;

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

  // SUBMISSION
  @GetMapping("/submission")
  private String traineeSubmission() {
    return "trainee/submission/submission";
  }

  @GetMapping("/task/{task_id}/submission-add/{trainee_id}")
  private String traineeAddSubmission(@PathVariable long trainee_id, @PathVariable long task_id) {
    return "trainee/submission/addSubmission";
  }

  @PostMapping("/task/{task_id}/submission-add/{trainee_id}")
  public String handleFileUpload(@PathVariable long task_id, @PathVariable long trainee_id,
      @RequestParam("fileInput") MultipartFile file,
      RedirectAttributes redirectAttributes) {
    String fileName = file.getOriginalFilename();
    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/downloadFile/")
        .path(fileName)
        .toUriString();

    fileStorageService.store(file);
    SubmissionRequest submission = new SubmissionRequest();
    submission.setSubmission_file(file.getOriginalFilename());
    submission.setSubmission_url(fileDownloadUri);
    submission.setSubmission_date(LocalDate.now());
    submission.setEmployeeId(trainee_id);
    submission.setTaskId(task_id);
    submissionService.create(submission);
    redirectAttributes.addFlashAttribute("message",

        "You successfully uploaded " + file.getOriginalFilename() + "!");

    return "redirect:/trainee/submission-add/" + trainee_id;
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
