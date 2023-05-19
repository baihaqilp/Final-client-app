package id.co.metrodata.clientapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;

@Service
public class RegisterService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/register")
    private String url;

    @PostMapping
    public User createTrainee(TraineeRequest traineeRequest) {
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity(traineeRequest),
                User.class).getBody();
    }
}
