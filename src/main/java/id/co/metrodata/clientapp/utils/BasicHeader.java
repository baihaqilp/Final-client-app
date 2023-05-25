package id.co.metrodata.clientapp.utils;

import java.nio.charset.Charset;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class BasicHeader {
    public static String createToken(String username, String password) {
        String auth = username + ":" + password;
        byte[] encode = Base64.encodeBase64(
                auth.getBytes(Charset.forName("US-ASCII")));
        return new String(encode);
    }

    public static HttpHeaders createHeader() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new HttpHeaders() {
            {
                set("Authorization", "Basic " + createToken(authentication.getPrincipal().toString(),
                        authentication.getCredentials().toString()));
            }
        };
    }
}
