package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;

@Service
public class UserService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/user")
    private String url;

    public List<User> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<User>>() {
                }).getBody();
    }

    public User getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<User>() {
                }).getBody();
    }

    public User create(TrainerRequest user) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(user),
                User.class).getBody();
    }

    public User update(long id, User user) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(user), User.class).getBody();
    }

    public User delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, User.class).getBody();
    }

}
