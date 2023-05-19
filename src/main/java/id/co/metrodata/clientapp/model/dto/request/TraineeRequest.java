package id.co.metrodata.clientapp.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TraineeRequest {
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String address;
    private long roleId = 2;
    private long classroomId;
}
