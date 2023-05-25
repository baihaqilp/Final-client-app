package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.SegmentMateri;
import id.co.metrodata.clientapp.model.dto.request.SegmentMateriRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class SegmentMateriService {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${server.baseUrl}/segmentmateri")
  private String url;

  public List<SegmentMateri> getAll() {
    return restTemplate.exchange(
        url,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<SegmentMateri>>() {
        }).getBody();
  }

  public SegmentMateri getById(long id) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<SegmentMateri>() {
        }).getBody();
  }

  public List<SegmentMateri> getBySegmentId(long id) {
    return restTemplate.exchange(
        url + "/segment/" + id,
        HttpMethod.GET,
        new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<SegmentMateri>>() {
        }).getBody();
  }

  public SegmentMateri create(SegmentMateriRequest segmentMateriRequest) {
    return restTemplate.exchange(
        url + "/",
        HttpMethod.POST,
        new HttpEntity(segmentMateriRequest, BasicHeader.createHeader()),
        SegmentMateri.class).getBody();
  }

  public SegmentMateri update(long id, SegmentMateri segmentMateri) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.PUT,
        new HttpEntity(segmentMateri, BasicHeader.createHeader()), SegmentMateri.class).getBody();
  }

  public SegmentMateri delete(long id) {
    return restTemplate.exchange(
        url + "/" + id,
        HttpMethod.DELETE,
        new HttpEntity(BasicHeader.createHeader()), SegmentMateri.class).getBody();
  }

}
