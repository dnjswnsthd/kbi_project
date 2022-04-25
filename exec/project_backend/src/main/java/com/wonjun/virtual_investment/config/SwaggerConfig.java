package com.wonjun.virtual_investment.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(servers = {
		@Server(url = "http://localhost:8000/api", description = "localhost"),
		@Server(url = "http://23.20.101.106/api", description = "AWS Server"),
})
public class SwaggerConfig {
	@Bean
	public OpenAPI springShopOpenAPI() {
		return new OpenAPI().info(new Info().title("Swagger API")
				.description("Spring Boot Swagger")
				.version("v0.0.1")
				.license(new License().name("Apache 2.0").url("http://spring.org")))
				.externalDocs(new ExternalDocumentation()
						.description("SpringShop Wiki Documentation")
						.url("https://springshop.wiki.github.org/docs"))
				.components(new Components()
				          .addSecuritySchemes("X-AUTH-TOKEN",
				                  new SecurityScheme().name("X-AUTH-TOKEN").type(SecurityScheme.Type.APIKEY).in(In.HEADER)));
	}
}
