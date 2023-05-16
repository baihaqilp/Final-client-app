package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Topic;

public class TopicService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/topic")
    private String url;

    public List<Topic> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Topic>>() {
                }).getBody();
    }

    public Topic getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Topic>() {
                }).getBody();
    }

    public Topic create(Topic topic) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(topic),
                Topic.class).getBody();
    }

    public Topic update(long id, Topic topic) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(topic), Topic.class).getBody();
    }

    public Topic delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, Topic.class).getBody();
    }
}
