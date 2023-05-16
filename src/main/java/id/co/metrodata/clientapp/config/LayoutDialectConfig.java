package id.co.metrodata.clientapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;

@Configuration
public class LayoutDialectConfig {

  @Bean
  public LayoutDialect layoutDialect() {
    return new LayoutDialect();
  }
}
