package id.co.metrodata.clientapp.controller.auth;

import java.util.Collection;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.metrodata.clientapp.model.dto.request.LoginRequest;
import id.co.metrodata.clientapp.service.LoginService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/login")
@AllArgsConstructor
public class LoginController {

    private LoginService loginService;

    @GetMapping
    public String loginView(LoginRequest loginRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return "login";
        }

        String redirectUrl = "";

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority grantedAuthority : authorities) {
            if (grantedAuthority.getAuthority().equals("ROLE_TRAINER")) {
                redirectUrl = "redirect:/index";
                break;
            } else if (grantedAuthority.getAuthority().equals("ROLE_TRAINEE")) {
                redirectUrl = "redirect:/indexx";
                break;
            } else if (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
                redirectUrl = "redirect:/index";
                break;
            }
        }

        return redirectUrl;
    }

    @PostMapping
    public String login(LoginRequest loginRequest) {
        if (!loginService.login(loginRequest)) {
            return "redirect:/login?error=true";
        }
        // return "redirect:/trainee";

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String redirectUrl = "";

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (GrantedAuthority grantedAuthority : authorities) {
            if (grantedAuthority.getAuthority().equals("ROLE_TRAINER")) {
                redirectUrl = "redirect:/trainer";
                break;
            } else if (grantedAuthority.getAuthority().equals("ROLE_TRAINEE")) {
                redirectUrl = "redirect:/trainee";
                break;
            } else if (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
                redirectUrl = "redirect:/admin";
                break;
            }
        }

        return redirectUrl;
    }
}
