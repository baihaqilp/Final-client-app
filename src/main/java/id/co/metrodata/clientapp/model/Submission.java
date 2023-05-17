package id.co.metrodata.clientapp.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    private long id;
    private String submission_file;
    private LocalDate submission_date;
    private Float nilai;
    private Task task;
    private Employee employee;

}
