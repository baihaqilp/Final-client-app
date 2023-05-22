package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Segment;
import id.co.metrodata.clientapp.model.dto.request.SegmentRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class SegmenService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/segment")
    private String url;

    public List<Segment> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Segment>>() {
                }).getBody();
    }

    public Segment getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Segment>() {
                }).getBody();
    }

    public Segment create(SegmentRequest segment) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(segment, BasicHeader.createHeader()),
                Segment.class).getBody();
    }

    public Segment update(long id, SegmentRequest segment) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(segment, BasicHeader.createHeader()), Segment.class).getBody();
    }

    public Segment delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Segment.class).getBody();
    }

    public List<Segment> getByClass(long id) {
        return restTemplate.exchange(
                url + "/class/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()),
                new ParameterizedTypeReference<List<Segment>>() {
                }).getBody();
    }
}
