package id.co.metrodata.clientapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {

    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String address;
    private long roleId;
}
