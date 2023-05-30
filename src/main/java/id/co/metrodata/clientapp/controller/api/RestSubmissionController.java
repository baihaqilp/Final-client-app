package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.Submission;
import id.co.metrodata.clientapp.model.dto.request.SubmissionRequest;
import id.co.metrodata.clientapp.service.SubmissionService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/submission")
@AllArgsConstructor
public class RestSubmissionController {

    private SubmissionService submissionService;

    @GetMapping
    public List<Submission> getAll() {
        return submissionService.getAll();
    }

    @GetMapping("/{id}")
    public Submission getById(@PathVariable long id) {
        return submissionService.getById(id);
    }

    @GetMapping("/task/{id}")
    public List<Submission> getTaskId(@PathVariable long id) {
        return submissionService.getTaskId(id);
    }

    @GetMapping("/task/{id}/trainee")
    public Submission getByTaskTrainee(@PathVariable Long id) {
        return submissionService.getByTaskTrainee(id);
    }

    @PostMapping
    public Submission create(@RequestBody SubmissionRequest submission) {
        return submissionService.create(submission);
    }

    @PutMapping("/{id}")
    public Submission update(@PathVariable long id, @RequestBody Submission submission) {
        return submissionService.update(id, submission);

    }

    @DeleteMapping("/{id}")
    public Submission delete(@PathVariable long id) {
        return submissionService.getById(id);
    }

}
