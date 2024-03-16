package com.leduslaci.tourismapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.leduslaci.tourismapp")
public class TourismAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(TourismAppApplication.class, args);
    }

}
