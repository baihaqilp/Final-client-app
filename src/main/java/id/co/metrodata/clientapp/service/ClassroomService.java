package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Classroom;
import id.co.metrodata.clientapp.model.dto.request.ClassroomRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class ClassroomService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/classroom")
    private String url;

    public List<Classroom> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Classroom>>() {
                }).getBody();
    }

    public List<Classroom> getAllnonAktif() {
        return restTemplate.exchange(
                url + "/noactive",
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Classroom>>() {
                }).getBody();
    }

    public Classroom getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Classroom>() {
                }).getBody();
    }

    public Classroom create(ClassroomRequest classroom) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(classroom, BasicHeader.createHeader()),
                Classroom.class).getBody();
    }

    public Classroom update(long id, ClassroomRequest classroom) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(classroom, BasicHeader.createHeader()), Classroom.class).getBody();
    }

    public Classroom delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Classroom.class).getBody();
    }

    public List<Classroom> getByProgramId(long id) {
        return restTemplate.exchange(
                url + "/program/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Classroom>>() {
                }).getBody();
    }

    public List<Classroom> getByStatus(long status) {
        return restTemplate.exchange(
                url + "/status/" + status,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Classroom>>() {
                }).getBody();
    }

    public Classroom getByTrainee() {
        return restTemplate.exchange(
                url + "/trainee",
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Classroom>() {
                }).getBody();
    }

}
