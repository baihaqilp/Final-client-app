package id.co.metrodata.clientapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Classroom {

    private long id;
    private String name;
    private Program program;
    private Boolean isStatus;
}
