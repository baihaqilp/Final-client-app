package id.co.metrodata.clientapp.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@ConfigurationProperties("storage")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StorageProperties {

    private String location = "upload-dir";
}
