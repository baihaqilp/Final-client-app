package id.co.metrodata.clientapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grade {

    private long id;
    private String name;
    private Float average;
    private String status;
    private Employee trainee;
    private Segment segment;

}
