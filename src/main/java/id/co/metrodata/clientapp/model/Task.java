package id.co.metrodata.clientapp.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    private long id;
    private String name;
    private String desc;
    private Date deadline;

}
