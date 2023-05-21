package id.co.metrodata.clientapp.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    private long id;
    private String submission_file;
    @JsonFormat(pattern = "dd-MM-yyyy", shape = Shape.STRING)
    private LocalDate submission_date;
    private Float nilai;
    private Task task;
    private Employee employee;

}
