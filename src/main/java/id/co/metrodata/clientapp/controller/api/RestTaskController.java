package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.model.dto.request.TaskRequest;
import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/task")
@AllArgsConstructor
public class RestTaskController {

    private TaskService taskService;

    @GetMapping
    public List<Task> getAll() {
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public Task getById(@PathVariable long id) {
        return taskService.getById(id);
    }

    @PostMapping
    public Task create(@RequestBody TaskRequest task) {
        return taskService.create(task);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable long id, @RequestBody TaskRequest task) {
        return taskService.update(id, task);

    }

    @DeleteMapping("/{id}")
    public Task delete(@PathVariable long id) {
        return taskService.delete(id);
    }

    @GetMapping("/segment/{id}")
    public List<Task> getBySegmentId(@PathVariable long id) {
        return taskService.getBySegment(id);
    }

    @GetMapping("/trainer")
    public List<Task> getByTrainer() {
        return taskService.getByTrainerId();
    }

    @GetMapping("/trainee")
    public List<Task> getByTrainee() {
        return taskService.getByTraineeId();
    }
}
