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

import id.co.metrodata.clientapp.model.Segmen;
import id.co.metrodata.clientapp.service.SegmenService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/segmen")
@AllArgsConstructor
public class RestSegmenController {

    private SegmenService segmenService;

    @GetMapping
    public List<Segmen> getAll() {
        return segmenService.getAll();
    }

    @GetMapping("/{id}")
    public Segmen getById(@PathVariable long id) {
        return segmenService.getById(id);
    }

    @PostMapping
    public Segmen create(@RequestBody Segmen segmen) {
        return segmenService.create(segmen);
    }

    @PutMapping("/{id}")
    public Segmen update(@PathVariable long id, @RequestBody Segmen segmen) {
        return segmenService.update(id, segmen);

    }

    @DeleteMapping("/{id}")
    public Segmen delete(@PathVariable long id) {
        return segmenService.getById(id);
    }
}
