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

import id.co.metrodata.clientapp.model.Topic;
import id.co.metrodata.clientapp.model.dto.request.TopicRequest;
import id.co.metrodata.clientapp.service.TopicService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/topic")
@AllArgsConstructor
public class RestTopicController {

    private TopicService topicService;

    @GetMapping
    public List<Topic> getAll() {
        return topicService.getAll();
    }

    @GetMapping("/{id}")
    public Topic getById(@PathVariable long id) {
        return topicService.getById(id);
    }

    @PostMapping
    public Topic create(@RequestBody TopicRequest topic) {
        return topicService.create(topic);
    }

    @PutMapping("/{id}")
    public Topic update(@PathVariable long id, @RequestBody TopicRequest topic) {
        return topicService.update(id, topic);

    }

    @DeleteMapping("/{id}")
    public Topic delete(@PathVariable long id) {
        return topicService.delete(id);
    }
}
