package com.mateuszbuczek.stockexchange.services;

import com.mateuszbuczek.stockexchange.models.ExchangeRateEntity;

import java.util.Set;

public interface ExchangeRateService {

    public ExchangeRateEntity getCurrentExchangeRate(String from, String to);
    public Set<ExchangeRateEntity> getIntradayExchangeRate(String from, String to);
    public Set<ExchangeRateEntity> getDailyExchangeRate(String from, String to);
    public Set<ExchangeRateEntity> getWeeklyExchangeRate(String from, String to);
    public Set<ExchangeRateEntity> getMonthlyExchangeRate(String from, String to);
}
