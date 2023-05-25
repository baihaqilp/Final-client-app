package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Evaluation;
import id.co.metrodata.clientapp.model.dto.request.EvaluationRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class EvaluationService {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${server.baseUrl}/evaluation")
  private String url;

  public List<Evaluation> getAll() {
    return restTemplate.exchange(
        url,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Evaluation>>() {
        }).getBody();
  }

  public Evaluation getById(long id) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Evaluation>() {
        }).getBody();
  }

  public Evaluation create(EvaluationRequest evaluationRequest) {
    return restTemplate.exchange(
        url,
        HttpMethod.POST,
        new HttpEntity(evaluationRequest, BasicHeader.createHeader()),
        Evaluation.class).getBody();
  }

  public Evaluation update(long id, EvaluationRequest evaluationRequest) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.PUT,
        new HttpEntity(evaluationRequest, BasicHeader.createHeader()), Evaluation.class).getBody();
  }

  public Evaluation delete(long id) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.DELETE,
        new HttpEntity(BasicHeader.createHeader()), Evaluation.class).getBody();
  }

  public List<Evaluation> getByTask(long id) {
    return restTemplate.exchange(
        url + "/task/" + id,
        HttpMethod.GET,
        null, new ParameterizedTypeReference<List<Evaluation>>() {
        }).getBody();
  }

}
