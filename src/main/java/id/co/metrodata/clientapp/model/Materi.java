package id.co.metrodata.clientapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Materi {

    private long id;
    private String name;
    private String desc;
    private Topic topic;

}
