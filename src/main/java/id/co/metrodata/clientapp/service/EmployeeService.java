package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Employee;

@Service
public class EmployeeService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/employee")
    private String url;

    public List<Employee> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<List<Employee>>() {
                }).getBody();
    }

    public Employee getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null, new ParameterizedTypeReference<Employee>() {
                }).getBody();
    }

    public Employee create(Employee employee) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                null,
                Employee.class).getBody();
    }

    public Employee update(long id, Employee employee) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                null, Employee.class).getBody();
    }

    public Employee delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null, Employee.class).getBody();
    }

}
