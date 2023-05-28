package id.co.metrodata.clientapp.model.dto.response;

import id.co.metrodata.clientapp.model.Classroom;
import id.co.metrodata.clientapp.model.Role;
import id.co.metrodata.clientapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeResponse {
  private String name;
  private String email;
  private String phone;
  private String address;
  private Role role;
  private User user;
  private Classroom classroom;
}
