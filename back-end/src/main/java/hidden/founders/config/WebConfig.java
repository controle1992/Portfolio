package hidden.founders.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class WebConfig {
    private final static String CLIENT_URL = "http://localhost:4200/register, http://localhost:4200/login, http://localhost:4200/albums";

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/back/**").allowedOrigins(CLIENT_URL);
            }
        };
    }
}
