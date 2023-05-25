package id.co.metrodata.clientapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation {

  private Long id;
  private Float nilai;
  private Submission submission;
  private Employee trainer;
}
