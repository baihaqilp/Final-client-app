package id.co.metrodata.clientapp.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    private long id;
    private String submission_file;
    private String submission_url;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime submission_date;
    private Task task;
    private Employee employee;
    private Evaluation evaluation;

}
