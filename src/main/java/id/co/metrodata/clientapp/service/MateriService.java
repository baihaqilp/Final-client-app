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
                null, new ParameterizedTypeReference<List<Materi>>() {
                }).getBody();
    }

    public Materi getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Materi>() {
                }).getBody();
    }

    public Materi create(Materi materi) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(materi),
                Materi.class).getBody();
    }

    public Materi update(long id, Materi materi) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(materi), Materi.class).getBody();
    }

    public Materi delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, Materi.class).getBody();
    }

}
