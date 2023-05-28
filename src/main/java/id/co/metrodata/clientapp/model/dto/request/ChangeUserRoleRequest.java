package id.co.metrodata.clientapp.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ChangeUserRoleRequest
 */
@Data
public class ChangeUserRoleRequest {

    private Long id;
    private Long roleId;
}