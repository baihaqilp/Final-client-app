package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Segmen;

@Service
public class SegmenService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/segmen")
    private String url;

    public List<Segmen> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Segmen>>() {
                }).getBody();
    }

    public Segmen getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Segmen>() {
                }).getBody();
    }

    public Segmen create(Segmen segmen) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(segmen),
                Segmen.class).getBody();
    }

    public Segmen update(long id, Segmen segmen) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(segmen), Segmen.class).getBody();
    }

    public Segmen delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, Segmen.class).getBody();
    }
}
