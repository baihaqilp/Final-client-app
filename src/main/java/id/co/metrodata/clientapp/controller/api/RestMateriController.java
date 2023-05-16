package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import id.co.metrodata.clientapp.model.Materi;
import id.co.metrodata.clientapp.service.MateriService;

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

    @PostMapping
    public Materi create(@RequestBody Materi materi) {
        return materiService.create(materi);
    }

    @PutMapping("/{id}")
    public Materi update(@PathVariable long id, @RequestBody Materi materi) {
        return materiService.update(id, materi);
    }

    @DeleteMapping("/{id}")
    public Materi delete(@PathVariable long id) {
        return materiService.getById(id);
    }
}
