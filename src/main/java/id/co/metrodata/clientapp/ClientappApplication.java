package id.co.metrodata.clientapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import id.co.metrodata.clientapp.service.FileStorageService;
import id.co.metrodata.clientapp.utils.StorageProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ClientappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientappApplication.class, args);
		System.out.println(" \n ClientApp is running.... \n");
	}

	@Bean
	CommandLineRunner init(FileStorageService storageService) {
		return (args) -> {
			storageService.init();
		};
	}

}
