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

import id.co.metrodata.clientapp.model.Classroom;
import id.co.metrodata.clientapp.model.dto.request.ClassroomRequest;
import id.co.metrodata.clientapp.service.ClassroomService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/classroom")
@AllArgsConstructor
public class RestClassroomController {

    private ClassroomService classroomService;

    @GetMapping
    public List<Classroom> getAll() {
        return classroomService.getAll();
    }

    @GetMapping("/noactive")
    public List<Classroom> getAllnonAktif() {
        return classroomService.getAllnonAktif();
    }

    @GetMapping("/{id}")
    public Classroom getById(@PathVariable long id) {
        return classroomService.getById(id);
    }

    @PostMapping
    public Classroom create(@RequestBody ClassroomRequest classroom) {
        return classroomService.create(classroom);
    }

    @PutMapping("/{id}")
    public Classroom update(@PathVariable long id, @RequestBody ClassroomRequest classroom) {
        return classroomService.update(id, classroom);
    }

    @DeleteMapping("/{id}")
    public Classroom delete(@PathVariable long id) {
        return classroomService.delete(id);
    }

    @GetMapping("/program/{id}")
    public List<Classroom> getByProgramId(@PathVariable long id) {
        return classroomService.getByProgramId(id);
    }

    @GetMapping("/trainee")
    public Classroom getByTrainee() {
        return classroomService.getByTrainee();
    }

    @GetMapping("/status")
    public Classroom getByStatus() {
        return classroomService.getByTrainee();
    }
}
