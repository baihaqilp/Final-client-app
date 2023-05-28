package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.Employee;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;
import id.co.metrodata.clientapp.model.dto.request.UserRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

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
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Employee>>() {
                }).getBody();
    }

    public Employee getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Employee>() {
                }).getBody();
    }

    public Employee getProfile() {
        return restTemplate.exchange(
                url + "/profile",
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<Employee>() {
                }).getBody();
    }

    public Employee create(Employee employee) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(employee, BasicHeader.createHeader()),
                Employee.class).getBody();
    }

    public Employee update(long id, UserRequest employee) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(employee), Employee.class).getBody();
    }

    public Employee delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), Employee.class).getBody();
    }

    public List<Employee> getByRole(long id) {
        return restTemplate.exchange(
                url + "/role/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Employee>>() {
                }).getBody();
    }

    public List<Employee> getByClass(long id) {
        return restTemplate.exchange(
                url + "/class/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<Employee>>() {
                }).getBody();
    }
}
