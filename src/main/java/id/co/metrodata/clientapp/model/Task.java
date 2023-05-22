package id.co.metrodata.clientapp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

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
    @JsonFormat(pattern = "dd-MM-yyyy", shape = Shape.STRING)
    private Date deadline;
    private Submission submission;
    private Segment segment;

}
