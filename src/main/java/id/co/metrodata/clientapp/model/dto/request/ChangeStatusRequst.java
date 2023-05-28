package id.co.metrodata.clientapp.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ChangeStatusRequst {
    private Long id;
    private Boolean status;
}
