package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.SegmentMateri;
import id.co.metrodata.clientapp.service.SegmentMateriService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/segmentmateri")
@AllArgsConstructor
public class RestSegmentMateriController {

  private SegmentMateriService segmentMateriService;

  @GetMapping
  public List<SegmentMateri> getAll() {
    return segmentMateriService.getAll();
  }

  @GetMapping("/{id}")
  public SegmentMateri getById(@PathVariable long id) {
    return segmentMateriService.getById(id);
  }

  @GetMapping("/segment/{id}")
  public List<SegmentMateri> getBySegmentId(@PathVariable long id) {
    return segmentMateriService.getBySegmentId(id);
  }
}
