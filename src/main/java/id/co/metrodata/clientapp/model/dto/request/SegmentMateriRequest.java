package id.co.metrodata.clientapp.model.dto.request;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import id.co.metrodata.clientapp.model.Materi;
import id.co.metrodata.clientapp.model.Segment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SegmentMateriRequest {

  private Long id;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
  private Date start_date;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
  private Date end_date;
  private Segment segment;
  private Materi materi;
}
