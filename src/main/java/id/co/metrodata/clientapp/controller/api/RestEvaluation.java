package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.Evaluation;
import id.co.metrodata.clientapp.model.dto.request.EvaluationRequest;
import id.co.metrodata.clientapp.service.EvaluationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/evaluation")
@AllArgsConstructor
public class RestEvaluation {

  private EvaluationService evaluationService;

  @GetMapping
  public List<Evaluation> getAll() {
    return evaluationService.getAll();
  }

  @GetMapping("/{id}")
  public Evaluation getById(@PathVariable long id) {
    return evaluationService.getById(id);
  }

  @GetMapping("/task/{id}")
  public List<Evaluation> getByTask(@PathVariable long id) {
    return evaluationService.getByTask(id);
  }

  @PostMapping
  public Evaluation create(@RequestBody EvaluationRequest evaluationRequest) {
    return evaluationService.create(evaluationRequest);
  }

  @PutMapping("/{id}")
  public Evaluation update(@PathVariable long id, @RequestBody EvaluationRequest evaluationRequest) {
    return evaluationService.update(id, evaluationRequest);
  }
}
