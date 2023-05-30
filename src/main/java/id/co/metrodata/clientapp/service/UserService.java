package id.co.metrodata.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.metrodata.clientapp.model.User;
import id.co.metrodata.clientapp.model.dto.request.ChangePasswordRequest;
import id.co.metrodata.clientapp.model.dto.request.ChangeStatusRequst;
import id.co.metrodata.clientapp.model.dto.request.ChangeUserRoleRequest;
import id.co.metrodata.clientapp.model.dto.request.LoginRequest;
import id.co.metrodata.clientapp.model.dto.request.TraineeRequest;
import id.co.metrodata.clientapp.model.dto.request.TrainerRequest;
import id.co.metrodata.clientapp.utils.BasicHeader;

@Service
public class UserService {

    @Autowired
    private RestTemplate restTemplate;
    private LoginService loginService;

    @Value("${server.baseUrl}/user")
    private String url;

    public List<User> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<List<User>>() {
                }).getBody();
    }

    public User getById(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                new HttpEntity(BasicHeader.createHeader()), new ParameterizedTypeReference<User>() {
                }).getBody();
    }

    public User create(TrainerRequest user) {
        return restTemplate.exchange(
                url + "/",
                HttpMethod.POST,
                new HttpEntity(user, BasicHeader.createHeader()),
                User.class).getBody();
    }

    public User update(long id, User user) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(user, BasicHeader.createHeader()), User.class).getBody();
    }

    public User delete(long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                new HttpEntity(BasicHeader.createHeader()), User.class).getBody();
    }

    public User changePassword(ChangePasswordRequest password) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User changepw = restTemplate.exchange(
                url + "/change-password",
                HttpMethod.POST,
                new HttpEntity(password),
                User.class).getBody();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                changepw.getUsername(), password.getPasswordNew(), authentication.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        return changepw;
    }

    public User updateRole(ChangeUserRoleRequest changeUserRoleRequest) {
        return restTemplate.exchange(
                url + "/change-role/",
                HttpMethod.POST,
                new HttpEntity(changeUserRoleRequest), User.class).getBody();
    }

    public User updateStatus(ChangeStatusRequst user) {
        return restTemplate.exchange(
                url + "/change-status/",
                HttpMethod.POST,
                new HttpEntity(user), User.class).getBody();
    }

}
