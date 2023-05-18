package id.co.metrodata.clientapp.model;

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

}
