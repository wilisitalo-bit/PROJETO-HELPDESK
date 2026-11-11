package com.helpdeskk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.persistence.autoconfigure.EntityScan;

@SpringBootApplication(scanBasePackages = "com.helpdesk.api")
@EnableJpaRepositories(basePackages = "com.helpdesk.api.repository")
@EntityScan(basePackages = "com.helpdesk.api.entity")
public class HelpdeskApiApplication {


public static void main(String[] args) {
    SpringApplication.run(HelpdeskApiApplication.class, args);
}


}
