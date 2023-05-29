package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.SegmentTopic;
import id.co.metrodata.clientapp.model.dto.request.SegmentTopicRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class SegmentTopicService {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${server.baseUrl}/segmenttopic")
  private String url;

  public List<SegmentTopic> getAll() {
    return restTemplate.exchange(
        url,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<SegmentTopic>>() {
        }).getBody();
  }

  public List<SegmentTopic> getBySegment(long id) {
    return restTemplate.exchange(
        url + "/bysegment/" + id,
        HttpMethod.GET,
        null, new ParameterizedTypeReference<List<SegmentTopic>>() {
        }).getBody();
  }

  public SegmentTopic getById(long id) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<SegmentTopic>() {
        }).getBody();
  }

  public List<SegmentTopic> getBySegmentId(long id) {
    return restTemplate.exchange(
        url + "/segment/" + id,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<SegmentTopic>>() {
        }).getBody();
  }

  public SegmentTopic create(SegmentTopicRequest segmentTopicRequest) {
    return restTemplate.exchange(
        url,
        HttpMethod.POST,
        new HttpEntity(segmentTopicRequest, BasicHeader.createHeader()),
        SegmentTopic.class).getBody();
  }

  public SegmentTopic update(long id, SegmentTopic SegmentTopic) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.PUT,
        new HttpEntity(SegmentTopic, BasicHeader.createHeader()), SegmentTopic.class).getBody();
  }

  public SegmentTopic delete(long id) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.DELETE,
        new HttpEntity(BasicHeader.createHeader()), SegmentTopic.class).getBody();
  }

}
