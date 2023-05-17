package id.co.metrodata.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/submission")
@AllArgsConstructor
public class SubmissionController {

    @GetMapping
    public String index() {
        return "index/submission";
    }
}
