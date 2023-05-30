package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Materi;
import id.co.metrodata.clientapp.model.dto.request.MateriRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class MateriService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/materi")
    private String url;

    public List<Materi> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Materi>>() {
                }).getBody();
    }

    public Materi getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Materi>() {
                }).getBody();
    }

    public List<Materi> getByTrainer() {
        return restTemplate.exchange(
                url + "/trainer",
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Materi>>() {
                }).getBody();
    }

    public List<Materi> getByTopicId(long id) {
        return restTemplate.exchange(
                url + "/topic/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Materi>>() {
                }).getBody();
    }

    public Materi create(MateriRequest materiRequest) {
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity(materiRequest),
                Materi.class).getBody();
    }

    public Materi update(long id, MateriRequest materi) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(materi, BasicHeader.createHeader()), Materi.class).getBody();
    }

    public Materi delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Materi.class).getBody();
    }

}
