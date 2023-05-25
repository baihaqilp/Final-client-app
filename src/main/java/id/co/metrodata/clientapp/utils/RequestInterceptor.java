package id.co.metrodata.clientapp.utils;

import java.io.IOException;

import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class RequestInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
            throws IOException {
        // TODO Auto-generated method stub
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!request.getURI().getPath().equals("/v1/login")) {
            request.getHeaders().add("Authorization", "Basic " +
                    BasicHeader.createToken(
                            authentication.getName(),
                            authentication.getCredentials().toString()));
        }

        ClientHttpResponse response = execution.execute(request, body);
        return response;
    }

}
