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
import id.co.metrodata.clientapp.model.dto.request.SubmissionRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

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
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Submission>>() {
                }).getBody();
    }

    public Submission getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Submission>() {
                }).getBody();
    }

    public Submission getByTaskTrainee(Long id) {
        return restTemplate.exchange(
                url + "/task/" + id + "/trainee",
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Submission>() {
                }).getBody();
    }

    public List<Submission> getTaskId(long id) {
        return restTemplate.exchange(
                url + "/task/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Submission>>() {
                }).getBody();
    }

    public Submission create(SubmissionRequest submission) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(submission, BasicHeader.createHeader()),
                Submission.class).getBody();
    }

    public Submission update(long id, Submission submission) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(submission, BasicHeader.createHeader()), Submission.class).getBody();
    }

    public Submission delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Submission.class).getBody();
    }

    public List<Submission> getByTaskId(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Submission>>() {
                }).getBody();
    }
}
