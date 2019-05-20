package com.mateuszbuczek.stockexchange.services;

import com.mateuszbuczek.stockexchange.models.ExchangeRateEntity;

import java.util.Set;

public interface ExchangeRateService {

    ExchangeRateEntity getCurrentExchangeRate(String from, String to);
    Set<ExchangeRateEntity> getIntradayExchangeRate(String from, String to);
    Set<ExchangeRateEntity> getDailyExchangeRate(String from, String to);
    Set<ExchangeRateEntity> getWeeklyExchangeRate(String from, String to);
    Set<ExchangeRateEntity> getMonthlyExchangeRate(String from, String to);
}
