package id.co.metrodata.clientapp.controller.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.service.RegisterService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/register")
@AllArgsConstructor
public class RestRegisterController {

    private RegisterService registerService;

    @PostMapping
    public User createTrainee(@RequestBody TraineeRequest user) {
        return registerService.createTrainee(user);
    }
}
