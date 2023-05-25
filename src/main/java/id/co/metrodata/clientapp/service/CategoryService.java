package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Category;

@Service
public class CategoryService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/category")
    private String url;

    public List<Category> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Category>>() {
                }).getBody();
    }

    public Category getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Category>() {
                }).getBody();
    }

    public Category delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, Category.class).getBody();
    }
}
