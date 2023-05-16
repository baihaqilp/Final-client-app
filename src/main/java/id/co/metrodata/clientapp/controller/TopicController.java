package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.service.TopicService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/topic")
@AllArgsConstructor
public class TopicController {

    private TopicService topicService;

    @GetMapping
    public String index(Model model) {
        model.addAttribute("topics", topicService.getAll());
        return "topic/index";
    }
}
