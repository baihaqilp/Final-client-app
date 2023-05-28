package id.co.metrodata.clientapp.model.dto.request;

import lombok.Data;

@Data
public class UserRequest {
  private String username;
  private String password;
  private String name;
  private String email;
  private String phone;
  private String address;
  private Long roleId;
  private Long classroomId;
}