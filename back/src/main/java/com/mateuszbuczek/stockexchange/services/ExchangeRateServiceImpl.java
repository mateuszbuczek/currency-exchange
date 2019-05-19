package com.mateuszbuczek.stockexchange.services;

import com.mateuszbuczek.stockexchange.configuration.CachingConfig;
import com.mateuszbuczek.stockexchange.exceptions.ResourceNotFoundException;
import com.mateuszbuczek.stockexchange.models.ExchangeRateEntity;
import org.json.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

import static com.mateuszbuczek.stockexchange.configuration.CachingConfig.*;

@Service
public class ExchangeRateServiceImpl implements ExchangeRateService{

    @Value("${API_KEY}")
    private String API_KEY;

    public ExchangeRateEntity getCurrentExchangeRate(String from, String to) {

        String data;
        ExchangeRateEntity exchangeRateEntity = null;

        try {
            data = getData(from, to, TimeSeries.CURRENCY_EXCHANGE_RATE);
            exchangeRateEntity = mapCurrentExchangeRateJsonDataToObject(data);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Invalid request parameters from " + from + " to " + to);
        }

        return exchangeRateEntity;
    }

    @Cacheable(INTRADAY_CACHING)
    public Set<ExchangeRateEntity> getIntradayExchangeRate(String from, String to) {

        String data;
        Set<ExchangeRateEntity> set = null;

        try {
            data = getData(from, to, TimeSeries.FX_INTRADAY);
            set = mapExchangeRateJsonDataToObject(data, "60min");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Invalid request parameters from " + from + " to " + to);
        }

        return set;
    }

    @Cacheable(DAILY_CACHING)
    public Set<ExchangeRateEntity> getDailyExchangeRate(String from, String to) {

        String data;
        Set<ExchangeRateEntity> set = null;

        try {
            data = getData(from, to, TimeSeries.FX_DAILY);
            set = mapExchangeRateJsonDataToObject(data, "Daily");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Invalid request parameters from " + from + " to " + to);
        }

        return set;
    }

    @Cacheable(WEEKLY_CACHING)
    public Set<ExchangeRateEntity> getWeeklyExchangeRate(String from, String to) {

        String data;
        Set<ExchangeRateEntity> set = null;

        try {
            data = getData(from, to, TimeSeries.FX_WEEKLY);
            set = mapExchangeRateJsonDataToObject(data, "Weekly");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Invalid request parameters from " + from + " to " + to);
        }

        return set;
    }

    @Cacheable(MONTHLY_CACHING)
    public Set<ExchangeRateEntity> getMonthlyExchangeRate(String from, String to) {

        String data;
        Set<ExchangeRateEntity> set = null;

        try {
            data = getData(from, to, TimeSeries.FX_MONTHLY);
            set = mapExchangeRateJsonDataToObject(data, "Monthly");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Invalid request parameters from " + from + " to " + to);
        }

        return set;
    }

    private Set<ExchangeRateEntity> mapExchangeRateJsonDataToObject(String data, String interval) {

        // map JSON String to Set<ExchangeRateEntity>
        Set<ExchangeRateEntity> set = new TreeSet<>(Comparator.comparing(ExchangeRateEntity::getTime));

        JSONObject jsonObject = new JSONObject(data);
        JSONObject metadata = jsonObject.getJSONObject("Meta Data");
        JSONObject array =  jsonObject.getJSONObject("Time Series FX (" + interval + ")");
        Set<String> keySet = array.keySet();

        for (String time : keySet) {
            ExchangeRateEntity item = new ExchangeRateEntity();

            String fromCurrencyCode = metadata.getString("2. From Symbol");
            String toCurrencyCode = metadata.getString("3. To Symbol");
            String exchangeRate = array.getJSONObject(time).getString("4. close");

            item.setFromCurrencyCode(fromCurrencyCode);
            item.setToCurrencyCode(toCurrencyCode);
            item.setExchangeRate(exchangeRate);
            item.setTime(time);

            set.add(item);
        }

        return set;
    }

    private ExchangeRateEntity mapCurrentExchangeRateJsonDataToObject(String data) throws Exception {

        // map JSON String to ExchangeRateEntity or Set<ExchangeRateEntity>
        ExchangeRateEntity exchangeRateEntity = new ExchangeRateEntity();

        JSONObject jsonObject = new JSONObject(data).getJSONObject("Realtime Currency Exchange Rate");
        String fromCurrencyCode = jsonObject.getString("1. From_Currency Code");
        String toCurrencyCode = jsonObject.getString("3. To_Currency Code");
        String exchangeRate = jsonObject.getString("5. Exchange Rate");
        String time = jsonObject.getString("6. Last Refreshed");

        exchangeRateEntity.setFromCurrencyCode(fromCurrencyCode);
        exchangeRateEntity.setToCurrencyCode(toCurrencyCode);
        exchangeRateEntity.setExchangeRate(exchangeRate);
        exchangeRateEntity.setTime(time);

        return exchangeRateEntity;
    }

    private String getData(String from, String to, TimeSeries function) throws Exception {
        String stringUrl;

        if(function == TimeSeries.CURRENCY_EXCHANGE_RATE)
            stringUrl = "https://www.alphavantage.co/query?function=" + function + "&apikey=" + API_KEY +
                    "&from_currency=" + from + "&to_currency=" + to;
        else
            stringUrl = "https://www.alphavantage.co/query?function=" + function + "&apikey=" + API_KEY +
                    "&from_symbol=" + from + "&to_symbol=" + to + "&outputsize=full&interval=60min";

        System.out.println(stringUrl);

        URL url = new URL(stringUrl);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;

        while((line = reader.readLine()) != null)
            response.append(line);

        reader.close();

        return response.toString();
    }

    enum TimeSeries {
        CURRENCY_EXCHANGE_RATE, FX_INTRADAY, FX_DAILY, FX_WEEKLY, FX_MONTHLY
    }
}
