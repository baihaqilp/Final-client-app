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

import id.co.metrodata.clientapp.model.Segment;
import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.model.dto.request.SegmentRequest;
import id.co.metrodata.clientapp.service.SegmenService;
import id.co.metrodata.clientapp.service.TaskService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/segment")
@AllArgsConstructor
public class RestSegmentController {

    private SegmenService segmenService;
    private TaskService taskService;

    @GetMapping
    public List<Segment> getAll() {
        return segmenService.getAll();
    }

    // group by trainer
    @GetMapping("/trainer")
    public List<Segment> getSegmentTrainer() {
        return segmenService.getSegmentTrainer();
    }

    @GetMapping("/all")
    public List<Segment> getSegmentTrainerAll() {
        return segmenService.getAllByTrainerId();
    }

    @GetMapping("/{id}")
    public Segment getById(@PathVariable long id) {
        return segmenService.getById(id);
    }

    @PostMapping
    public Segment create(@RequestBody SegmentRequest segment) {
        return segmenService.create(segment);
    }

    @PutMapping("/{id}")
    public Segment update(@PathVariable long id, @RequestBody SegmentRequest segment) {
        return segmenService.update(id, segment);

    }

    @DeleteMapping("/{id}")
    public Segment delete(@PathVariable long id) {
        return segmenService.delete(id);
    }

    @GetMapping("/class/{id}")
    public List<Segment> getByClass(@PathVariable long id) {
        return segmenService.getByClass(id);
    }

    @GetMapping("/task/{id}")
    public List<Task> getBySegments(@PathVariable long id) {
        return taskService.getBySegment(id);
    }

    @GetMapping("/trainer/{id}")
    public List<Segment> getByTrainer(@PathVariable long id) {
        return segmenService.getByTrainerId(id);
    }

    @GetMapping("/class/{class_id}/trainer")
    public List<Segment> getByClassIdAndTrainerId(@PathVariable long class_id) {
        return segmenService.getByClassIdAndTrainerId(class_id);
    }

    @GetMapping("/class/trainee")
    private List<Segment> getSegmentClassTrainee() {
        return segmenService.getSegmentClassTrainee();
    }
}
