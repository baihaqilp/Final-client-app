package id.co.metrodata.clientapp.controller.api;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import id.co.metrodata.clientapp.model.dto.request.SubmissionRequest;
import id.co.metrodata.clientapp.service.ClassroomService;
import id.co.metrodata.clientapp.service.FileStorageService;
import id.co.metrodata.clientapp.service.SegmenService;
import id.co.metrodata.clientapp.service.SegmentTopicService;
import id.co.metrodata.clientapp.service.SubmissionService;
import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/api/trainee")
@AllArgsConstructor
public class RestTraineeController {

        private ClassroomService classroomService;
        private FileStorageService fileStorageService;
        private SubmissionService submissionService;
        private TaskService taskService;
        private SegmenService segmenService;
        private SegmentTopicService segmentTopicService;

        @PostMapping("/task/{task_id}/submission-add")
        public String handleFileUpload(@PathVariable long task_id,
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
                submission.setTaskId(task_id);
                submissionService.create(submission);
                redirectAttributes.addFlashAttribute("message",

                                "You successfully uploaded " + file.getOriginalFilename() + "!");

                return "redirect:/task/trainee";
        }
}
