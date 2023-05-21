package id.co.metrodata.clientapp.model.dto.request;

import id.co.metrodata.clientapp.model.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MateriRequest {

  private String name;
  private String desc;
  private Long topicId;

}
