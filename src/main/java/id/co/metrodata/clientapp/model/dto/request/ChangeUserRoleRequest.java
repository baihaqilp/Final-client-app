package id.co.metrodata.clientapp.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ChangeUserRoleRequest
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserRoleRequest {

    private long id;
    private long roleId;
}