package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.Privilege;
import id.co.metrodata.clientapp.service.PrivilegeService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/privilege")
@AllArgsConstructor
public class RestPrivilegeController {

    private PrivilegeService privilegeService;

    @GetMapping
    public List<Privilege> getAll() {

        return privilegeService.getAll();
    }

    @GetMapping("/{id}")
    public Privilege getById(@PathVariable long id) {
        return privilegeService.getById(id);
    }
}
