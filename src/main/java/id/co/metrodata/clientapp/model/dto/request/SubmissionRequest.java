package id.co.metrodata.clientapp.model.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionRequest {

    private long id;
    private String submission_file;
    private String submission_url;
    private LocalDate submission_date;
    private long taskId;
    private long employeeId;
}
