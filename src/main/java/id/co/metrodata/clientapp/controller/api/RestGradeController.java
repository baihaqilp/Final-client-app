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

import id.co.metrodata.clientapp.model.Grade;
import id.co.metrodata.clientapp.service.GradeService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/grade")
@AllArgsConstructor
public class RestGradeController {

    private GradeService gradeService;

    @GetMapping
    public List<Grade> getAll() {
        return gradeService.getAll();
    }

    @GetMapping("/{id}")
    public Grade getById(@PathVariable long id) {
        return gradeService.getById(id);
    }

    @PostMapping
    public Grade create(@RequestBody Grade grade) {
        return gradeService.create(grade);
    }

    @PutMapping("/{id}")
    public Grade update(@PathVariable long id, @RequestBody Grade grade) {
        return gradeService.update(id, grade);
    }

    @DeleteMapping("/{id}")
    public Grade delete(@PathVariable long id) {
        return gradeService.getById(id);
    }

    @GetMapping("/classroom/{id}")
    public List<Grade> getAllClass(@PathVariable long id) {
        return gradeService.getAllClass(id);
    }

}
