package id.co.metrodata.clientapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Long id;
    private String username;
    private String password;
    private Boolean isEnabled = true;
    private Boolean isAccountNonLocked = true;

    private List<Role> roles;
}
