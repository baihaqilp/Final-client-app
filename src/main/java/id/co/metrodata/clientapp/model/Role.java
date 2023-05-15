package id.co.metrodata.clientapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    private long id;
    private String name;

    private List<Privilege> privilege;
}
