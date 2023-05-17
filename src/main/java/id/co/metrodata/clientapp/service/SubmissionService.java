package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Submission;

@Service
public class SubmissionService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/submission")
    private String url;

    public List<Submission> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Submission>>() {
                }).getBody();
    }

    public Submission getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Submission>() {
                }).getBody();
    }

    public Submission create(Submission submission) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(submission),
                Submission.class).getBody();
    }

    public Submission update(long id, Submission submission) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(submission), Submission.class).getBody();
    }

    public Submission delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, Submission.class).getBody();
    }
}
