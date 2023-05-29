package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.SegmentTopic;
import id.co.metrodata.clientapp.model.dto.request.SegmentTopicRequest;
import id.co.metrodata.clientapp.service.SegmentTopicService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/segmenttopic")
@AllArgsConstructor
public class RestSegmentTopicController {

  private SegmentTopicService segmentTopicService;

  @GetMapping
  public List<SegmentTopic> getAll() {
    return segmentTopicService.getAll();
  }

  @GetMapping("/{id}")
  public SegmentTopic getById(@PathVariable long id) {
    return segmentTopicService.getById(id);
  }

  @GetMapping("/bysegment/{id}")
  public List<SegmentTopic> getBySegment(@PathVariable long id) {
    return segmentTopicService.getBySegment(id);
  }

  @PostMapping
  public SegmentTopic create(@RequestBody SegmentTopicRequest segmentTopicRequest) {
    return segmentTopicService.create(segmentTopicRequest);
  }
}
