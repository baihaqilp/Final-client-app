package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Grade;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class GradeService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/grade")
    private String url;

    public List<Grade> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Grade>>() {
                }).getBody();
    }

    public Grade getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Grade>() {
                }).getBody();
    }

    public List<Grade> getAllClass(long id) {
        return restTemplate.exchange(
                url + "/classroom/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Grade>>() {
                }).getBody();
    }

    public Grade create(Grade grade) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(grade, BasicHeader.createHeader()),
                Grade.class).getBody();
    }

    public Grade update(long id, Grade grade) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(grade, BasicHeader.createHeader()), Grade.class).getBody();
    }

    public Grade delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Grade.class).getBody();
    }

}
