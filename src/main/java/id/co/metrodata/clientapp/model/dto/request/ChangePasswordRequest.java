package id.co.metrodata.clientapp.model.dto.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {
  private String passwordOld;
  private String passwordNew;
}
