package id.co.metrodata.clientapp.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ChangeStatusRequst {
    private long id;
    private boolean status;
}
