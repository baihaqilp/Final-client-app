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

import id.co.metrodata.clientapp.model.Materi;
import id.co.metrodata.clientapp.model.dto.request.MateriRequest;
import id.co.metrodata.clientapp.service.MateriService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/materi")
@AllArgsConstructor
public class RestMateriController {

    private MateriService materiService;

    @GetMapping
    public List<Materi> getAll() {
        return materiService.getAll();
    }

    @GetMapping("/{id}")
    public Materi getById(@PathVariable long id) {
        return materiService.getById(id);
    }

    @GetMapping("/trainer")
    public List<Materi> getByTrainer() {
        return materiService.getByTrainer();
    }

    @PostMapping
    public Materi create(@RequestBody MateriRequest materi) {
        return materiService.create(materi);
    }

    @PutMapping("/{id}")
    public Materi update(@PathVariable long id, @RequestBody MateriRequest materi) {
        return materiService.update(id, materi);
    }

    @DeleteMapping("/{id}")
    public Materi delete(@PathVariable long id) {
        return materiService.delete(id);
    }

    @GetMapping("/topic/{id}")
    public List<Materi> getByTopicId(@PathVariable long id) {
        return materiService.getByTopicId(id);
    }
}
