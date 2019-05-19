package com.mateuszbuczek.stockexchange.controllers.v1;

import com.mateuszbuczek.stockexchange.models.ExchangeRateEntity;
import com.mateuszbuczek.stockexchange.services.ExchangeRateService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import sun.reflect.generics.tree.Tree;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

public class ExchangeRateControllerTest {

    @Mock
    ExchangeRateService exchangeRateService;

    @InjectMocks
    ExchangeRateController exchangeRateController;

    MockMvc mockMvc;

    private static final ExchangeRateEntity exchangeRateEntity1 = ExchangeRateEntity.builder()
            .time("2014-08-07").build();
    private static final ExchangeRateEntity exchangeRateEntity2 = ExchangeRateEntity.builder()
            .time("2015-08-07").build();
    private static final ExchangeRateEntity exchangeRateEntity3 = ExchangeRateEntity.builder()
            .time("2013-08-07").build();

    public static final String TO = "PLN";
    public static final String FROM = "EUR";

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(exchangeRateController).build();
    }

    @Test
    public void getCurrentRate() throws Exception {

        ExchangeRateEntity exchangeRateEntity = new ExchangeRateEntity().builder()
                .fromCurrencyCode(FROM).toCurrencyCode(TO).build();


        when(exchangeRateService.getCurrentExchangeRate(anyString(), anyString())).thenReturn(exchangeRateEntity);

        mockMvc.perform(get("/api/v1/current")
                .contentType(MediaType.APPLICATION_JSON)
                .param("from", FROM)
                .param("to", TO))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fromCurrencyCode", equalTo(FROM)))
                .andExpect(jsonPath("$.toCurrencyCode", equalTo(TO)));
    }

    @Test
    public void getIntradayRate() throws Exception {

        Set<ExchangeRateEntity> set = new TreeSet<>(Comparator.comparing(ExchangeRateEntity::getTime));
        set.add(exchangeRateEntity1);
        set.add(exchangeRateEntity2);
        set.add(exchangeRateEntity3);

        when(exchangeRateService.getIntradayExchangeRate(anyString(), anyString())).thenReturn(set);

        mockMvc.perform(get("/api/v1/intraday")
                .contentType(MediaType.APPLICATION_JSON)
                .param("from", FROM)
                .param("to", TO))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(set.size())));

    }

}