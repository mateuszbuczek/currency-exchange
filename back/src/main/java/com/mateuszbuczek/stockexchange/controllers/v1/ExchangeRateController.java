package com.mateuszbuczek.stockexchange.controllers.v1;

import com.mateuszbuczek.stockexchange.models.ExchangeRateEntity;
import com.mateuszbuczek.stockexchange.services.ExchangeRateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    public ExchangeRateController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    @GetMapping("current")
    public ResponseEntity<?> getCurrentRate(@RequestParam("from") String from, @RequestParam("to") String to) {
        ExchangeRateEntity currentExchangeRateEntity = exchangeRateService.getCurrentExchangeRate(from, to);

        return new ResponseEntity<ExchangeRateEntity>(currentExchangeRateEntity, HttpStatus.OK);
    }

    @GetMapping("intraday")
    public ResponseEntity<?> getIntradayRate(@RequestParam("from") String from, @RequestParam("to") String to) {
        Set<ExchangeRateEntity> intradayExchangeRate = exchangeRateService.getIntradayExchangeRate(from, to);

        return new ResponseEntity<Set<ExchangeRateEntity>>(intradayExchangeRate, HttpStatus.OK);
    }

    @GetMapping("daily")
    public ResponseEntity<?> getDailyRate(@RequestParam("from") String from, @RequestParam("to") String to) {
        Set<ExchangeRateEntity> dailyExchangeRate = exchangeRateService.getDailyExchangeRate(from, to);

        return new ResponseEntity<Set<ExchangeRateEntity>>(dailyExchangeRate, HttpStatus.OK);
    }

    @GetMapping("weekly")
    public ResponseEntity<?> getWeeklyRate(@RequestParam("from") String from, @RequestParam("to") String to) {
        Set<ExchangeRateEntity> weeklyExchangeRate = exchangeRateService.getWeeklyExchangeRate(from, to);

        return new ResponseEntity<Set<ExchangeRateEntity>>(weeklyExchangeRate, HttpStatus.OK);
    }

    @GetMapping("monthly")
    public ResponseEntity<?> getMonthlyRate(@RequestParam("from") String from, @RequestParam("to") String to) {
        Set<ExchangeRateEntity> monthlyExchangeRate = exchangeRateService.getMonthlyExchangeRate(from, to);

        return new ResponseEntity<Set<ExchangeRateEntity>>(monthlyExchangeRate, HttpStatus.OK);
    }



}
