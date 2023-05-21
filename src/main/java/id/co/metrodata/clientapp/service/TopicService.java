package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Topic;
import id.co.metrodata.clientapp.model.dto.request.TopicRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class TopicService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/topic")
    private String url;

    public List<Topic> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Topic>>() {
                }).getBody();
    }

    public Topic getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Topic>() {
                }).getBody();
    }

    public Topic create(TopicRequest topic) {
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity(topic, BasicHeader.createHeader()),
                Topic.class).getBody();
    }

    public Topic update(long id, TopicRequest topic) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(topic, BasicHeader.createHeader()), Topic.class).getBody();
    }

    public Topic delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Topic.class).getBody();
    }
}
