package id.co.metrodata.clientapp.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Segmen {

    private long id;
    private String name;
    private LocalDate start_date;
    private LocalDate end_date;
}
