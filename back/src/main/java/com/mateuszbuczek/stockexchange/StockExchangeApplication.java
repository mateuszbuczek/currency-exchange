package com.mateuszbuczek.stockexchange;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
public class StockExchangeApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockExchangeApplication.class, args);
    }

}
