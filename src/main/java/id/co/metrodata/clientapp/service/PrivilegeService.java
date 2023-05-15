package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Privilege;

@Service
public class PrivilegeService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/privilege")
    private String url;

    public List<Privilege> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Privilege>>() {
                }).getBody();
    }

    public Privilege getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Privilege>() {
                }).getBody();
    }

}
