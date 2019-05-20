package com.mateuszbuczek.stockexchange.configuration;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableCaching
@EnableScheduling
public class CachingConfig {

    public static final String INTRADAY_CACHING = "INTRADAY_CACHING";
    public static final String DAILY_CACHING = "DAILY_CACHING";
    public static final String MONTHLY_CACHING = "MONTHLY_CACHING";
    public static final String WEEKLY_CACHING = "WEEKLY_CACHING";

    @CacheEvict(allEntries = true, cacheNames = {INTRADAY_CACHING,DAILY_CACHING,MONTHLY_CACHING,WEEKLY_CACHING})
    @Scheduled(fixedDelay = 10 * 60 * 1000)
    public void cacheEvict() {
        System.out.println("Cache flushed");
    }
}
