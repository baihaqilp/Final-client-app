package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Program;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class ProgramService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/program")
    private String url;

    public List<Program> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Program>>() {
                }).getBody();
    }

    public Program getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Program>() {
                }).getBody();
    }

    public Program create(Program program) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(program, BasicHeader.createHeader()),
                Program.class).getBody();
    }

    public Program update(long id, Program program) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(program, BasicHeader.createHeader()), Program.class).getBody();
    }

    public Program delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Program.class).getBody();
    }
}
