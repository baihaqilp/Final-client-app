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

import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.ChangePasswordRequest;
import id.co.metrodata.clientapp.model.dto.request.ChangeStatusRequst;
import id.co.metrodata.clientapp.model.dto.request.ChangeUserRoleRequest;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;
import id.co.metrodata.clientapp.service.RegisterService;
import id.co.metrodata.clientapp.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class RestUserController {

    private UserService userService;
    private RegisterService registerService;

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable long id) {
        return userService.getById(id);
    }

    @PostMapping
    public User create(@RequestBody TrainerRequest user) {
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public User delete(@PathVariable long id) {
        return userService.delete(id);
    }

    @PostMapping("/trainee")
    public User createTrainee(@RequestBody TraineeRequest traineeRequest) {
        return registerService.createTrainee(traineeRequest);
    }

    @PostMapping("/changepassword")
    public User changePassword(@RequestBody ChangePasswordRequest passwordRequest) {
        return userService.changePassword(passwordRequest);
    }

    @PostMapping("/changeRole")
    public User changeRole(@RequestBody ChangeUserRoleRequest userRoleRequest) {
        return userService.updateRole(userRoleRequest);
    }

    @PostMapping("/changeStatus")
    public User changeStatus(@RequestBody ChangeStatusRequst userStatRequest) {
        return userService.updateStatus(userStatRequest);
    }

}
