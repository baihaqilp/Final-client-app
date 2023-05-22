package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Task;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class TaskService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/task")
    private String url;

    public List<Task> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Task>>() {
                }).getBody();
    }

    public Task getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Task>() {
                }).getBody();
    }

    public List<Task> getBySegmentId(long id) {
        return restTemplate.exchange(
                url + "/segment/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Task>>() {
                }).getBody();
    }

    public Task create(Task task) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(task, BasicHeader.createHeader()),
                Task.class).getBody();
    }

    public Task update(long id, Task task) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(task, BasicHeader.createHeader()), Task.class).getBody();
    }

    public Task delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Task.class).getBody();
    }
}
