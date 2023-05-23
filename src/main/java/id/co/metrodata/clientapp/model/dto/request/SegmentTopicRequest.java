package id.co.metrodata.clientapp.model.dto.request;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import id.co.metrodata.clientapp.model.Segment;
import id.co.metrodata.clientapp.model.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SegmentTopicRequest {

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
  private Date start_date;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
  private Date end_date;
  private Long segmentId;
  private Long topicId;
}
