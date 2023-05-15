package id.co.metrodata.clientapp.controller.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.metrodata.clientapp.model.Role;
import id.co.metrodata.clientapp.service.RoleService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/role")
@AllArgsConstructor
public class RestRoleController {

    private RoleService roleService;

    @GetMapping
    public List<Role> getAll() {
        return roleService.getAll();
    }

    @GetMapping("/{id}")
    public Role getById(@PathVariable long id) {
        return roleService.getById(id);
    }

}
